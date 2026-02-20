import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'

const requestResetSchema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = requestResetSchema.parse(body)

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        { message: 'If the email exists, a recovery link will be sent' },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    const resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    user.resetToken = resetTokenHash
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    // In production, send email with reset link
    // For now, return the token for demo purposes
    return NextResponse.json(
      {
        message: 'Password recovery initiated',
        resetToken, // In production, don't send this in response
        email: user.email,
        securityQuestions: user.securityAnswers.map((sa: any) => ({
          questionId: sa.questionId,
          question: sa.question,
        })),
      },
      { status: 200 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'Failed to process password recovery' },
      { status: 500 }
    )
  }
}
