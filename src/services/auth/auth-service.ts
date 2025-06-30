'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const authorizationEndpoints = {
  google: {
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI,
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  },
}

const createQueryParams = async (provider: 'google') => {
  const cookieStore = await cookies()
  const state = crypto.randomUUID()
  cookieStore.set('oauth_state', state)

  return new URLSearchParams({
    client_id: authorizationEndpoints[provider].clientId!,
    redirect_uri: authorizationEndpoints[provider].redirectUri!,
    response_type: 'code',
    scope: 'openid email profile',
    state,
  })
}

export const redirectAuthorizationEndpoint = async (provider: 'google') => {
  const queryParams = await createQueryParams(provider)
  const url = `${authorizationEndpoints[provider].endpoint}?${queryParams.toString()}`

  redirect(url)
}

export const getAccessToken = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  return accessToken
}

export const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies()
  cookieStore.set('access_token', accessToken)
}

export const deleteAccessToken = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
}
