import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { hash } from 'bcryptjs'

const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  resetToken: z.string().optional(),
  securityAnswers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.string(),
    })
  ).min(3, 'Must verify at least 3 security questions'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = resetPasswordSchema.parse(body)

    await connectDB()

    const user = await User.findOne({ email: validatedData.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify security answers
    const answersVerified = await Promise.all(
      validatedData.securityAnswers.map((answer) =>
        user.verifySecurityAnswer(answer.questionId, answer.answer)
      )
    )

    if (!answersVerified.every((verified) => verified)) {
      return NextResponse.json(
        { error: 'One or more security answers are incorrect' },
        { status: 400 }
      )
    }

    // Verify reset token if provided
    if (validatedData.resetToken) {
      const resetTokenHash = crypto
        .createHash('sha256')
        .update(validatedData.resetToken)
        .digest('hex')

      if (user.resetToken !== resetTokenHash || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        return NextResponse.json(
          { error: 'Reset token is invalid or expired' },
          { status: 400 }
        )
      }
    }

    // Hash and update password
    const hashedPassword = await hash(validatedData.newPassword, 12)
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}
