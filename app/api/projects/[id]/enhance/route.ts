import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/lib/models/Project'
import User from '@/lib/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateArchitecture } from '@/lib/ai/code-generator'

interface ProjectFile {
  id: string
  name: string
  path: string
  content?: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

function organizeFilesIntoTree(files: ProjectFile[]): ProjectFile[] {
  const tree: ProjectFile[] = []
  const folderMap = new Map<string, ProjectFile>()

  for (const file of files) {
    const parts = file.path.split('/')
    let currentPath = ''

    // Create folder structure
    for (let i = 0; i < parts.length - 1; i++) {
      currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i]
      
      if (!folderMap.has(currentPath)) {
        const folder: ProjectFile = {
          id: `folder-${currentPath}`,
          name: parts[i],
          path: currentPath,
          type: 'folder',
          children: [],
        }
        folderMap.set(currentPath, folder)
      }
    }

    // Add file to its parent folder
    if (parts.length > 1) {
      const parentPath = parts.slice(0, -1).join('/')
      const parent = folderMap.get(parentPath)
      if (parent && parent.children) {
        parent.children.push(file)
      }
    } else {
      // Root level file
      tree.push(file)
    }
  }

  // Build tree from root folders
  const roots = Array.from(folderMap.values()).filter(f => !f.path.includes('/'))
  return [...tree, ...roots]
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

    // Generate enhanced architecture with the requested modifications
    const enhancedArchitecture = await generateArchitecture({
      name: `${project.name} - Enhanced`,
      description: `${project.description}\n\nAdditional Requirements: ${modifications}`,
      projectType: project.projectType,
      targetPlatform: project.targetPlatform,
      preferredStack: project.preferredStack,
    })

    // Merge new files with existing ones (avoiding duplicates but updating if needed)
    const existingPaths = new Set((project.files as ProjectFile[]).map((f: ProjectFile) => f.path))
    const newFiles = enhancedArchitecture.sampleFiles
      ?.filter((f) => !existingPaths.has(f.path))
      .map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: f.path.split('/').pop() || f.path,
        path: f.path,
        content: f.code,
        type: 'file' as const,
      })) || []

    // Combine existing and new files
    const allFiles = [...(project.files as ProjectFile[]), ...newFiles]
    
    // Organize into proper folder structure
    const organizedFiles = organizeFilesIntoTree(allFiles)

    // Add new files to project with organized structure
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        files: organizedFiles,
        generatedArchitecture: enhancedArchitecture,
      },
      { new: true }
    )

    return NextResponse.json(
      {
        project: updatedProject,
        message: `Successfully added ${newFiles.length} new files to your project`,
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
