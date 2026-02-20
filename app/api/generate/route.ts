import { NextRequest, NextResponse } from 'next/server'
import { buildFileTreeFromArchitecture, generateArchitecture } from '@/lib/ai/code-generator'
import { connectDB } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Project from '@/lib/models/Project'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

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

    const body = await request.json()
    const {
      name,
      projectName,
      description,
      projectType,
      targetPlatform,
      preferredStack,
    } = body

    const normalizedName = (name || projectName || '').toString().trim()
    const normalizedDescription = (description || '').toString().trim()
    const normalizedProjectType = (projectType || 'web-app').toString().trim()
    const normalizedTargetPlatform = (targetPlatform || 'web').toString().trim()
    const normalizedPreferredStack = (preferredStack || '').toString().trim()

    if (!normalizedName || !normalizedDescription) {
      return NextResponse.json(
        { error: 'Project name and description are required' },
        { status: 400 }
      )
    }

    const generatedArchitecture = await generateArchitecture({
      name: normalizedName,
      description: normalizedDescription,
      projectType: normalizedProjectType,
      targetPlatform: normalizedTargetPlatform,
      preferredStack: normalizedPreferredStack,
    })

    const files = buildFileTreeFromArchitecture(generatedArchitecture)

    const project = new Project({
      userId: user._id,
      name: normalizedName,
      description: normalizedDescription,
      projectType: normalizedProjectType,
      targetPlatform: normalizedTargetPlatform,
      preferredStack: normalizedPreferredStack,
      generatedArchitecture,
      files,
    })

    await project.save()

    return NextResponse.json({
      success: true,
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        projectType: project.projectType,
        targetPlatform: project.targetPlatform,
        preferredStack: project.preferredStack,
        generatedArchitecture: project.generatedArchitecture,
        files: project.files,
      },
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate project' },
      { status: 500 }
    )
  }
}
