import { prisma } from '@/lib/prisma'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    googleId?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    googleId?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (
        account?.provider === 'google' &&
        account.providerAccountId &&
        user.email
      ) {
        try {
          // GoogleIDでユーザーを検索
          const existingUser = await prisma.user.findUnique({
            where: { id: account.providerAccountId },
          })

          if (!existingUser) {
            // 新規ユーザーをトランザクションで作成
            await prisma.$transaction(async (tx) => {
              // Userを作成（IDはGoogleID）
              const newUser = await tx.user.create({
                data: {
                  id: account.providerAccountId!,
                  name: user.name || '',
                  email: user.email!,
                },
              })

              // UserProfileを作成
              await tx.userProfile.create({
                data: {
                  personalId: crypto
                    .randomUUID()
                    .replace(/-/g, '')
                    .substring(0, 16),
                  displayName: user.name || 'Unknown User',
                  imageUrl: user.image || '',
                  description: '',
                  userId: newUser.id,
                },
              })
            })
          }

          return true
        } catch (error) {
          console.error('Error creating user:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user && account?.id_token) {
        token.idToken = account?.id_token
      }

      // GoogleIDをトークンに保存
      if (account?.providerAccountId) {
        token.googleId = account.providerAccountId
      }

      return token
    },
    async session({ token, session }) {
      session.idToken = token.idToken
      session.googleId = token.googleId

      return session
    },
    async redirect({ url, baseUrl }) {
      // ログインページからのリダイレクトの場合、setup-tokenページにリダイレクト
      if (url === `${baseUrl}/login`) {
        return `${baseUrl}/auth/setup-token`
      }

      // その他の場合は通常通り
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
})
