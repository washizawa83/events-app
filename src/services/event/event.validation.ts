import { EventType } from '@prisma/client'
import z from 'zod'

// バリデーション用のヘルパー関数
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

// イベント作成用のバリデーションスキーマ
export const createEventSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: 'イベント名を入力してください' })
      .max(50, { message: 'イベント名は50文字以内で入力してください' }),
    description: z
      .string()
      .min(1, { message: 'イベントの説明を入力してください' })
      .max(1000, { message: 'イベントの説明は1000文字以内で入力してください' }),
    tags: z
      .array(z.string())
      .max(10, { message: 'タグは10個まで入力可能です' })
      .optional(),
    startDate: z.string().min(1, { message: '開始日を入力してください' }),
    startDateTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: '時間は "HH:MM" の形式で指定してください（例: 09:30）',
    }),
    endDate: z.string().min(1, { message: '終了日を入力してください' }),
    endDateTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: '時間は "HH:MM" の形式で指定してください（例: 09:30）',
    }),
    eventType: z.enum([EventType.OFFLINE, EventType.ONLINE, EventType.HYBRID], {
      message: 'イベントの種類を選択してください',
    }),
    prefecture: z.string().optional(),
    city: z.string().optional(),
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
  .refine(
    async (data) => {
      return data.tags?.every((tag) => tag.length <= 20) ?? true
    },
    {
      message: 'タグは20文字以内で入力してください',
      path: ['tags'],
    },
  )

// FormDataをパースする関数
export const parseEventFormData = (formData: FormData) => {
  const tagsString = formData.get('tags') as string
  let tags: string[] = []

  if (tagsString) {
    try {
      tags = JSON.parse(tagsString)
    } catch (error) {
      tags = []
    }
  }

  return {
    title: formData.get('title'),
    description: formData.get('description'),
    tags: tags,
    startDate: formData.get('startDate'),
    startDateTime: formData.get('startDateTime'),
    endDate: formData.get('endDate'),
    endDateTime: formData.get('endDateTime'),
    eventType: formData.get('eventType'),
    prefecture: formData.get('prefecture[id]') ?? '',
    city: formData.get('city[id]') ?? '',
    locationDetail: formData.get('locationDetail') ?? '',
    onlineLocationDetail: formData.get('onlineLocationDetail') ?? '',
    eventConditions: formData.get('eventConditions'),
    maxCapacity: formData.get('maxCapacity'),
    overview: formData.get('overview'),
    contact: formData.get('contact'),
  }
}

// バリデーション結果の型
export type CreateEventValidationResult = z.SafeParseReturnType<
  z.infer<typeof createEventSchema>,
  z.infer<typeof createEventSchema>
>

// FormDataをバリデーションする関数
export const validateEventFormData = async (
  formData: FormData,
): Promise<CreateEventValidationResult> => {
  const parsedData = parseEventFormData(formData)
  return await createEventSchema.safeParseAsync(parsedData)
}
