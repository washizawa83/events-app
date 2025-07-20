'use server'

import { EventType } from '@prisma/client'
import z from 'zod'

const offlineEventValidation = (data: any): boolean => {
  return (
    data.prefecture &&
    data.prefecture.length > 0 &&
    data.city &&
    data.city.length > 0 &&
    data.locationDetail &&
    data.locationDetail.length > 0
  )
}

const onlineEventValidation = (data: any): boolean => {
  return data.onlineLocationDetail && data.onlineLocationDetail.length > 0
}

const createEventSchema = z
  .object({
    eventName: z
      .string()
      .min(1, { message: 'イベント名を入力してください' })
      .max(50, { message: 'イベント名は50文字以内で入力してください' }),
    eventDescription: z
      .string()
      .min(1, { message: 'イベントの説明を入力してください' })
      .max(1000, { message: 'イベントの説明は1000文字以内で入力してください' }),
    startDate: z.date(),
    startDateTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: '時間は "HH:MM" の形式で指定してください（例: 09:30）',
    }),
    endDate: z.date(),
    endDateTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: '時間は "HH:MM" の形式で指定してください（例: 09:30）',
    }),
    eventType: z.enum([EventType.OFFLINE, EventType.ONLINE, EventType.HYBRID], {
      message: 'イベントの種類を選択してください',
    }),
    prefecture: z
      .string()
      .max(4, { message: '開催地は4文字以内で入力してください' })
      .optional(),
    city: z
      .string()
      .max(20, { message: '開催地は20文字以内で入力してください' })
      .optional(),
    locationDetail: z
      .string()
      .max(100, { message: '開催地の詳細は100文字以内で入力してください' })
      .optional(),
    onlineLocationDetail: z.string().max(250, {
      message: 'オンライン開催場所は250文字以内で入力してください',
    }),
    eventConditions: z
      .string()
      .max(250, { message: '参加条件は250文字以内で入力してください' }),
    maxCapacity: z
      .string()
      .max(100, { message: '参加人数は100人以内で入力してください' }),
    overview: z
      .string()
      .max(250, { message: 'その他・概要は250文字以内で入力してください' }),
    contact: z
      .string()
      .max(250, { message: 'お問い合わせは250文字以内で入力してください' }),
  })
  .refine(
    async (data) => {
      if (
        data.eventType === EventType.OFFLINE ||
        data.eventType === EventType.HYBRID
      ) {
        return offlineEventValidation(data)
      }
      return true
    },
    {
      message:
        'オフライン開催の場合、開催地の都道府県、市区町村、詳細をすべて入力してください',
      path: ['locationDetail'],
    },
  )
  .refine(
    async (data) => {
      if (
        data.eventType === EventType.ONLINE ||
        data.eventType === EventType.HYBRID
      ) {
        return onlineEventValidation(data)
      }
      return true
    },
    {
      message: 'オンライン開催の場合、オンライン開催場所を入力してください',
      path: ['onlineLocationDetail'],
    },
  )

type createEventActionState = {
  errorMessage: {
    eventName?: string[]
    eventDescription?: string[]
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
  } | null
}

export const createEventAction = async (
  prevState: createEventActionState,
  formData: FormData,
) => {
  const validatedFields = await createEventSchema.safeParseAsync({
    eventName: formData.get('eventName'),
    eventDescription: formData.get('eventDescription'),
    startDate: new Date(formData.get('startDate') as string),
    startDateTime: formData.get('startDateTime'),
    endDate: new Date(formData.get('endDate') as string),
    endDateTime: formData.get('endDateTime'),
    eventType: formData.get('eventType'),
    prefecture: formData.get('prefecture[label]') ?? '',
    city: formData.get('city[label]') ?? '',
    locationDetail: formData.get('locationDetail'),
    onlineLocationDetail: formData.get('onlineLocationDetail'),
    eventConditions: formData.get('eventConditions'),
    maxCapacity: formData.get('maxCapacity'),
    overview: formData.get('overview'),
    contact: formData.get('contact'),
  })

  if (validatedFields.error) {
    const errorMessages = validatedFields.error.flatten().fieldErrors
    return { errorMessage: errorMessages }
  }

  return { errorMessage: null }
}
