import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// 環境変数からJWTシークレットを取得（本番環境では必ず設定してください）
const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-please-change-in-production'
const secret = new TextEncoder().encode(JWT_SECRET)

export interface CustomJWTPayload extends JWTPayload {
  userId: string // UserProfileのID（アプリリソースアクセス用）
  email: string
  name?: string
  role?: string
}

/**
 * 独自のJWTトークンを生成
 */
export async function generateCustomJWT(
  payload: Omit<CustomJWTPayload, 'iat' | 'exp' | 'jti' | 'sub'>,
) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // 24時間の有効期限
    .setJti(crypto.randomUUID()) // ユニークなJWT ID
    .setSubject(String(payload.userId)) // UserProfileのIDをsubjectに設定
    .sign(secret)

  return jwt
}

/**
 * JWTトークンを検証してペイロードを取得
 */
export async function verifyCustomJWT(
  token: string,
): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as CustomJWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

/**
 * CookieからJWTを取得して検証
 */
export async function getTokenFromCookies(): Promise<CustomJWTPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    return await verifyCustomJWT(token)
  } catch (error) {
    console.error('Failed to get token from cookies:', error)
    return null
  }
}

/**
 * JWTトークンをデコード（検証なし）
 */
export function decodeCustomJWT(token: string): CustomJWTPayload | null {
  try {
    const [, payloadBase64] = token.split('.')
    const payload = JSON.parse(atob(payloadBase64))
    return payload as CustomJWTPayload
  } catch (error) {
    console.error('JWT decode failed:', error)
    return null
  }
}

/**
 * JWTトークンの有効期限をチェック
 */
export function isJWTExpired(token: string): boolean {
  const payload = decodeCustomJWT(token)
  if (!payload?.exp) return true

  return Date.now() >= payload.exp * 1000
}
