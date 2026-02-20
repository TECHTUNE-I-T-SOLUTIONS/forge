import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  securityAnswers: z.array(
    z.object({
      questionId: z.string(),
      question: z.string(),
      answer: z.string().min(1, 'Answer is required'),
    })
  ).min(3, 'At least 3 security questions must be answered'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const validatedData = signUpSchema.parse(body)

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Hash security answers
    const hashedSecurityAnswers = await Promise.all(
      validatedData.securityAnswers.map(async (answer) => ({
        questionId: answer.questionId,
        question: answer.question,
        answer: await hash(answer.answer.toLowerCase().trim(), 12),
      }))
    )

    // Create user
    const user = new User({
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
      securityAnswers: hashedSecurityAnswers,
    })

    await user.save()

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: String(user._id),
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
