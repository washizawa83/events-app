import { verifyCustomJWT } from '@/utils/jwt'
import { NextRequest, NextResponse } from 'next/server'

// 認証が必要なパス
const protectedPaths = ['/user', '/calendar']

// 認証不要なパス（ログイン済みユーザーがアクセスできないパス）
const authPaths = ['/login', '/auth/setup-token']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // 認証が必要なパスの場合
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      // トークンがない場合はログインページにリダイレクト
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // JWTを検証
      await verifyCustomJWT(token)
      // 認証成功、リクエストを続行
      return NextResponse.next()
    } catch (error) {
      // 無効なトークンの場合はログインページにリダイレクト
      const response = NextResponse.redirect(new URL('/login', request.url))
      // 無効なトークンを削除
      response.cookies.delete('auth-token')
      return response
    }
  }

  // ログイン済みユーザーがログインページなどにアクセスした場合
  if (authPaths.includes(pathname) && token) {
    try {
      await verifyCustomJWT(token)
      // 認証済みユーザーはホームページにリダイレクト
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      // 無効なトークンの場合はそのまま進む
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  // API routes, _next/static, _next/image, favicon.ico を除外
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
