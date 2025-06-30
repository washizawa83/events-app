'use client'

import { deleteAccessToken, getAccessToken } from '@/services/auth/auth-service'
import { loginUserAtom } from '@/services/jotai/loginUserAtom'
import type { paths } from '@/types/api'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createStore } from 'jotai'

// パスからレスポンス型を抽出するユーティリティ型
type ApiResponse<
  TPath extends keyof paths,
  TMethod extends keyof paths[TPath],
> = paths[TPath][TMethod] extends {
  responses: {
    200: {
      content: {
        'application/json': infer T
      }
    }
  }
}
  ? T
  : any

// メソッドとパスの組み合わせを制限する型
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 有効なメソッドのみを許可する型
type ValidMethod<TPath extends keyof paths> = {
  [K in ApiMethod]: paths[TPath][Lowercase<K>] extends { responses: any }
    ? K
    : never
}[ApiMethod]

const store = createStore()

export const apiRequest = async <
  TPath extends keyof paths,
  TMethod extends ValidMethod<TPath>,
>(
  path: TPath,
  method: TMethod,
  data: any,
  isAuthorizeRequest: boolean = false,
): Promise<AxiosResponse<ApiResponse<TPath, Lowercase<TMethod>>>> => {
  const accessToken = await getAccessToken()

  try {
    const response = await axios<ApiResponse<TPath, Lowercase<TMethod>>>({
      url: `${process.env.NEXT_PUBLIC_ENDPOINT}${path}`,
      method,
      data,
      headers: isAuthorizeRequest
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    })
    return response
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      await deleteAccessToken()
      store.set(loginUserAtom, null)
      throw error
    }
    throw error
  }
}
