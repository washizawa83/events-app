import { prisma } from '@/lib/prisma'
import { getTokenFromCookies } from '@/utils/jwt'

export const getUserProfile = async () => {
  try {
    const jwtToken = await getTokenFromCookies()
    if (!jwtToken) {
      return null
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: {
        id: jwtToken.userId,
      },
    })

    return userProfile
  } catch (error) {
    console.error('User profile fetch error:', error)
    return null
  }
}
