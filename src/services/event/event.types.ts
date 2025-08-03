import {
  Area,
  City,
  Event,
  EventMedia,
  EventStatus,
  EventTag,
  EventType,
  Prefecture,
  UserProfile,
} from '@prisma/client'

// 基本的なイベント型（リレーションなし）
export type BaseEvent = Event

// リレーションを含むイベント型
export type EventWithRelations = Event & {
  tags: EventTag[]
  prefecture: Prefecture | null
  area: Area | null
  city: City | null
  owner: UserProfile | null
  attendees: UserProfile[]
  medias: EventMedia[]
}

// getEvents用の型（よく使われるリレーション）
export type EventWithBasicRelations = Event & {
  tags: EventTag[]
  prefecture: Prefecture | null
  area: Area | null
  city: City | null
}

// getEvent用の型（全てのリレーション含む）
export type EventWithFullRelations = Event & {
  tags: EventTag[]
  prefecture: Prefecture | null
  area: Area | null
  city: City | null
  owner: UserProfile
  attendees: UserProfile[]
  medias: EventMedia[]
}

// イベント作成時のレスポンス型
export type CreateEventResult = {
  success: boolean
  errorMessage?: string
  eventId?: string
}

// イベント更新用のデータ型
export type UpdateEventData = {
  title?: string
  description?: string
  tags?: string[]
  startDate?: string
  startDateTime?: string
  endDate?: string
  endDateTime?: string
  eventType?: EventType
  locationDetail?: string
  onlineLocationDetail?: string
  eventConditions?: string
  maxCapacity?: string
  overview?: string
  contact?: string
  eventStatus?: EventStatus
}

// イベント検索用のフィルター型
export type EventFilter = {
  eventType?: EventType
  eventStatus?: EventStatus
  prefectureId?: string
  areaId?: string
  cityId?: string
  tags?: string[]
  startDate?: Date
  endDate?: Date
  ownerId?: string
}

// イベント一覧用のページネーション型
export type EventListOptions = {
  page?: number
  limit?: number
  sortBy?: 'startDateTime' | 'createdAt' | 'title'
  sortOrder?: 'asc' | 'desc'
  filter?: EventFilter
}
