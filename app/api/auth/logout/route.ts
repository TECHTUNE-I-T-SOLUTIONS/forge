import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ authenticated: false })
  response.cookies.set('forge_user', '', {
    path: '/',
    maxAge: 0,
  })
  return response
}
