import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { generateCustomJWT } from '@/utils/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // NextAuthのセッションを確認
    const session = await auth()

    if (!session?.user || !session.googleId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // GoogleIDからUserProfileを取得
    const userProfile = await prisma.userProfile.findFirst({
      where: {
        userId: session.googleId,
      },
    })

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 },
      )
    }

    // 実際のUserProfileデータでJWTを生成
    const customToken = await generateCustomJWT({
      userId: userProfile.id, // UserProfileのUUID
      email: session.user.email!,
      name: userProfile.displayName,
      role: 'user',
    })

    // レスポンスを作成
    const response = NextResponse.json({
      success: true,
      user: {
        id: userProfile.id,
        email: session.user.email,
        name: userProfile.displayName,
        role: 'user',
      },
    })

    // httpOnly Cookieにセット
    response.cookies.set('auth-token', customToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24時間（秒単位）
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Token generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
