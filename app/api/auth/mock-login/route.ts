import { NextResponse } from 'next/server'

const MOCK_USER = {
  id: 'local-demo-user',
  email: 'demo@forge.dev',
  name: 'Demo User',
}

export async function POST() {
  const response = NextResponse.json({ authenticated: true, user: MOCK_USER })
  response.cookies.set('forge_user', JSON.stringify(MOCK_USER), {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
