import { apiRequest } from '@/services/api/api-service'
import { setAccessToken } from '@/services/auth/auth-service'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const cookieStore = await cookies()
  const savedState = cookieStore.get('oauth_state')?.value

  if (!code || !state || state !== savedState) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  cookieStore.delete('oauth_state')

  try {
    const accessTokenResponse = await apiRequest('auth/google', 'POST', {
      code,
    })
    await setAccessToken(accessTokenResponse.data.access_token)

    const userResponse = await apiRequest('users/me', 'GET', {}, true)
    console.log('userResponse', userResponse.data)

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('[Google OAuth Error]', error)
    return NextResponse.redirect(
      new URL('/login?error=auth_failed', request.url),
    )
  }
}
