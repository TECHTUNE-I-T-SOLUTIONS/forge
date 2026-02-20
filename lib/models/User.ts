import mongoose, { Document, Schema } from 'mongoose'

export interface SecurityAnswerPair {
  questionId: string
  question: string
  answer: string // hashed
}

export interface IUser extends Document {
  email: string
  name: string
  password: string // hashed
  securityAnswers: SecurityAnswerPair[]
  resetToken?: string
  resetTokenExpiry?: Date
  createdAt: Date
  verifyPassword(password: string): Promise<boolean>
  verifySecurityAnswer(questionId: string, answer: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    securityAnswers: [
      {
        questionId: {
          type: String,
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    resetToken: String,
    resetTokenExpiry: Date,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

// Password verification method
userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.compare(password, this.password)
}

// Security answer verification method
userSchema.methods.verifySecurityAnswer = async function (
  questionId: string,
  answer: string
): Promise<boolean> {
  const bcrypt = await import('bcryptjs')
  const securityAnswer = this.securityAnswers.find(
    (sa: SecurityAnswerPair) => sa.questionId === questionId
  )
  if (!securityAnswer) return false
  return bcrypt.compare(answer.toLowerCase().trim(), securityAnswer.answer)
}

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
