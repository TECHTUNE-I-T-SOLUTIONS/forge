import { cookies } from 'next/headers'
import mongoose from 'mongoose'
import User from '@/lib/models/User'

export interface SessionUser {
  id: string
  email: string
  name: string
}

const SESSION_COOKIE_NAME = 'forge_user'

function parseSessionCookie(value?: string): SessionUser | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value)
    if (!parsed?.id || !parsed?.email || !parsed?.name) return null
    return parsed as SessionUser
  } catch {
    return null
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return parseSessionCookie(sessionValue)
}

export async function getOrCreateDefaultUserId(): Promise<mongoose.Types.ObjectId> {
  const email = 'guest@forge.local'
  const name = 'Forge Guest'

  const existing = await User.findOne({ email })
  if (existing?._id) return existing._id as mongoose.Types.ObjectId

  const created = await User.create({ email, name })
  return created._id as mongoose.Types.ObjectId
}
