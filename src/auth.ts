import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account?.id_token) {
        token.idToken = account?.id_token
      }
      console.log('token', token)
      return token
    },
    async session({ token, session }) {
      session.idToken = token.idToken
      console.log('session', session)
      return session
    },
  },
})
