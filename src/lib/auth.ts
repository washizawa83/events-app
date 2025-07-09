'use server'

import { verifyCustomJWT } from '@/utils/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logoutUser = async () => {
  // auth-tokenクッキーを削除
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')

  // ログインページにリダイレクト
  redirect('/login')
}

export const requireAuth = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const payload = await verifyCustomJWT(token)
    return payload
  } catch (error) {
    // 無効なトークンの場合はクッキーを削除してログインページにリダイレクト
    cookieStore.delete('auth-token')
    redirect('/login')
  }
}

export const getAuthUser = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const payload = await verifyCustomJWT(token)
    return payload
  } catch (error) {
    return null
  }
}
