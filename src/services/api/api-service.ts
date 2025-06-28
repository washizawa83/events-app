import { deleteAccessToken, getAccessToken } from '@/services/auth/auth-service'
import axios, { AxiosError } from 'axios'

export const apiRequest = async (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data: any,
  isAuthorizeRequest: boolean = false,
) => {
  const accessToken = await getAccessToken()

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_ENDPOINT}${path}`,
      method,
      data,
      headers: isAuthorizeRequest
        ? {
            Authorization: `Bearer ${'aaaa'}`,
          }
        : undefined,
    })
    return response
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      await deleteAccessToken()
      throw new Error('Unauthorized')
    }
    throw error
  }
}
