import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/lib/models/Project'
import User from '@/lib/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
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

    // Get only the user's projects
    const projects = await Project.find({ userId: user._id }).sort({ createdAt: -1 }).limit(100)
    
    return NextResponse.json({
      success: true,
      projects,
    })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    if (body?.action === 'duplicate' && body?.projectId) {
      const original = await Project.findById(body.projectId)
      if (!original) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }

      // Ensure user can only duplicate their own projects
      if (original.userId.toString() !== user._id.toString()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
      }

      const clone = await Project.create({
        userId: user._id,
        name: `${original.name} (Copy)`,
        description: original.description,
        projectType: original.projectType,
        targetPlatform: original.targetPlatform,
        preferredStack: original.preferredStack,
        generatedArchitecture: original.generatedArchitecture,
        files: original.files,
      })

      return NextResponse.json({ success: true, project: clone })
    }

    const project = await Project.create({
      userId: user._id,
      name: body?.name || 'Untitled Project',
      description: body?.description || '',
      projectType: body?.projectType || 'web-app',
      targetPlatform: body?.targetPlatform || 'web',
      preferredStack: body?.preferredStack || '',
      generatedArchitecture: body?.generatedArchitecture || null,
      files: Array.isArray(body?.files) ? body.files : [],
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (error) {
    console.error('Failed to create/duplicate project:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
