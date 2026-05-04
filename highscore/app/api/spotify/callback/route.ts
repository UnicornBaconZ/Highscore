import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const error = request.nextUrl.searchParams.get('error')

  if (error) {
    return NextResponse.json({ error })
  }

  if (!code) {
    return NextResponse.json({ error: 'No code found' }, { status: 400 })
  }

  return NextResponse.json({
    message: 'Copy this code and exchange it for a refresh token.',
    code,
  })
}
