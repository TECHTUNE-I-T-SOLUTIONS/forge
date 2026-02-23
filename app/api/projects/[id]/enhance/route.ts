import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/lib/models/Project'
import User from '@/lib/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { buildFileTreeFromArchitecture, generateArchitecture } from '@/lib/ai/code-generator'

interface ProjectFile {
  id: string
  name: string
  path: string
  content?: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

function flattenFiles(nodes: ProjectFile[] = []): ProjectFile[] {
  const output: ProjectFile[] = []

  const walk = (items: ProjectFile[]) => {
    for (const item of items) {
      if (item.type === 'file') {
        output.push(item)
      }
      if (item.children && item.children.length > 0) {
        walk(item.children)
      }
    }
  }

  walk(nodes)
  return output
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get the authenticated user
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const project = await Project.findById(id)
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Ensure user owns the project
    if (project.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { modifications } = await request.json()

    if (!modifications?.trim()) {
      return NextResponse.json(
        { error: 'Modifications text is required' },
        { status: 400 }
      )
    }

    const existingFlatFiles = flattenFiles((project.files as ProjectFile[]) || [])

    // Generate enhancement based on current payload from DB
    const enhancedArchitecture = await generateArchitecture({
      name: project.name,
      description: project.description,
      projectType: project.projectType,
      targetPlatform: project.targetPlatform,
      preferredStack: project.preferredStack,
      generationMode: 'enhance',
      editRequest: modifications,
      existingArchitectureSnapshot: JSON.stringify(project.generatedArchitecture || {}, null, 2),
      existingFilesSnapshot: existingFlatFiles.map((file) => ({
        path: file.path,
        content: file.content || '',
      })),
    })

    // Patch existing files by path and add newly generated files by path
    const fileByPath = new Map<string, { path: string; description: string; code: string }>()

    for (const file of existingFlatFiles) {
      fileByPath.set(file.path, {
        path: file.path,
        description: 'Existing project file',
        code: file.content || '',
      })
    }

    let createdCount = 0
    let updatedCount = 0

    for (const generatedFile of enhancedArchitecture.sampleFiles || []) {
      if (fileByPath.has(generatedFile.path)) {
        updatedCount += 1
      } else {
        createdCount += 1
      }
      fileByPath.set(generatedFile.path, {
        path: generatedFile.path,
        description: generatedFile.description || 'Generated file',
        code: generatedFile.code,
      })
    }

    const mergedSampleFiles = Array.from(fileByPath.values())
    const rebuiltTree = buildFileTreeFromArchitecture({
      overview: enhancedArchitecture.overview,
      techStack: enhancedArchitecture.techStack,
      architectureType: enhancedArchitecture.architectureType,
      components: enhancedArchitecture.components,
      folderStructure: enhancedArchitecture.folderStructure,
      sampleFiles: mergedSampleFiles,
    })

    // Save patched project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        files: rebuiltTree,
        generatedArchitecture: {
          ...enhancedArchitecture,
          sampleFiles: mergedSampleFiles,
        },
      },
      { new: true }
    )

    return NextResponse.json(
      {
        project: updatedProject,
        message: `Project updated successfully (${createdCount} added, ${updatedCount} updated)`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to enhance project:', error)
    return NextResponse.json(
      {
        error: 'Failed to enhance project',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
