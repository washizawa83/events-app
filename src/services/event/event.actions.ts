'use server'

import {
  getAreaById,
  getCityById,
  getPrefectureById,
} from '@/services/location/cruds/read'
import { getUserProfile } from '@/services/user/user'
import { EventType } from '@prisma/client'
import { redirect } from 'next/navigation'
import { createEvent } from './event.service'
import { validateEventFormData } from './event.validation'

// Server Actionの戻り値の型定義
export type CreateEventActionState = {
  errorMessage: {
    title?: string[]
    description?: string[]
    tags?: string[]
    imageUrls?: string[]
    startDate?: string[]
    startDateTime?: string[]
    endDate?: string[]
    endDateTime?: string[]
    eventType?: string[]
    prefecture?: string[]
    city?: string[]
    locationDetail?: string[]
    onlineLocationDetail?: string[]
    eventConditions?: string[]
    maxCapacity?: string[]
    overview?: string[]
    contact?: string[]
    general?: string[]
  } | null
  prevFormData?: FormData
}

// 都道府県情報を取得するヘルパー関数
const getPrefecture = async (prefectureId: string, eventType: EventType) => {
  if (eventType === EventType.ONLINE) {
    return null
  }
  return await getPrefectureById(prefectureId)
}

// エリア情報を取得するヘルパー関数
const getArea = async (areaId: string) => {
  if (areaId === '') {
    return null
  }
  return await getAreaById(areaId)
}

// 市区町村情報を取得するヘルパー関数
const getCity = async (cityId: string, eventType: EventType) => {
  if (eventType === EventType.ONLINE) {
    return null
  }
  return await getCityById(cityId)
}

// イベント作成のServer Action
export const createEventAction = async (
  prevState: CreateEventActionState,
  formData: FormData,
): Promise<CreateEventActionState> => {
  // バリデーション
  const validatedFields = await validateEventFormData(formData)

  if (validatedFields.error) {
    const errorMessages = validatedFields.error.flatten().fieldErrors
    return { errorMessage: errorMessages, prevFormData: formData }
  }

  const validatedFormData = validatedFields.data

  // ユーザー情報の取得
  const user = await getUserProfile()
  if (!user) {
    return {
      errorMessage: { general: ['ユーザーが見つかりません'] },
      prevFormData: formData,
    }
  }

  // 地域情報の取得
  const prefecture = await getPrefecture(
    validatedFormData.prefecture ?? '',
    validatedFormData.eventType,
  )
  const city = await getCity(
    validatedFormData.city ?? '',
    validatedFormData.eventType,
  )
  const area = await getArea(city?.areaId ?? '')

  // オフライン/ハイブリッドイベントの地域情報チェック
  if (
    validatedFormData.eventType === EventType.OFFLINE ||
    validatedFormData.eventType === EventType.HYBRID
  ) {
    if (!prefecture || !city || !area) {
      return {
        errorMessage: {
          general: ['開催地（オフライン）の入力が適切ではありません'],
        },
        prevFormData: formData,
      }
    }
  }

  // イベント作成の実行
  const result = await createEvent(
    validatedFormData,
    user.id,
    prefecture?.id ?? null,
    city?.id ?? null,
    area?.id ?? null,
  )

  if (!result.success) {
    return {
      errorMessage: {
        general: [result.errorMessage || 'イベントの作成に失敗しました'],
      },
      prevFormData: formData,
    }
  }

  return redirect(`/event/detail/${result.eventId}`)
}
