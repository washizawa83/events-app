import { prisma } from '@/lib/prisma'
import { EventType } from '@prisma/client'
import dayjs from 'dayjs'
import {
  CreateEventResult,
  EventWithBasicRelations,
  EventWithFullRelations,
} from './event.types'

// タグ関連のサービス
export const findOrCreateEventTag = async (tagName: string) => {
  // 既存のタグを検索
  let existingTag = await prisma.eventTag.findFirst({
    where: { name: tagName },
  })

  // 存在しない場合は作成
  if (!existingTag) {
    existingTag = await prisma.eventTag.create({
      data: { name: tagName },
    })
  }

  return existingTag
}

export const createEventTags = async (tagNames: string[]) => {
  const tagIds: string[] = []

  for (const tagName of tagNames) {
    const tag = await findOrCreateEventTag(tagName)
    tagIds.push(tag.id)
  }

  return tagIds
}

// イベント作成用の型定義
export type CreateEventData = {
  title: string
  description: string
  tags?: string[]
  imageUrls?: string[]
  startDate: string
  startDateTime: string
  endDate: string
  endDateTime: string
  eventType: EventType
  prefecture?: string
  city?: string
  locationDetail?: string
  onlineLocationDetail?: string
  eventConditions?: string
  maxCapacity?: string
  overview?: string
  contact?: string
}

// イベント作成サービス
export const createEvent = async (
  eventData: CreateEventData,
  ownerId: string,
  prefectureId?: string | null,
  cityId?: string | null,
  areaId?: string | null,
): Promise<CreateEventResult> => {
  try {
    // 日時の作成
    const startDateTime = dayjs(
      eventData.startDate + ' ' + eventData.startDateTime,
    ).toDate()
    const endDateTime = dayjs(
      eventData.endDate + ' ' + eventData.endDateTime,
    ).toDate()

    // タグの処理（先に作成）
    let tagIds: string[] = []
    if (eventData.tags && eventData.tags.length > 0) {
      tagIds = await createEventTags(eventData.tags)
    }

    // トランザクションでEventとEventMediaを同時に作成
    const result = await prisma.$transaction(async (tx) => {
      // 1. Eventを作成
      const event = await tx.event.create({
        data: {
          title: eventData.title,
          description: eventData.description,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          locationDetail: eventData.locationDetail ?? null,
          onlineLocationDetail: eventData.onlineLocationDetail ?? null,
          conditions: eventData.eventConditions ?? null,
          maxCapacity: eventData.maxCapacity ?? null,
          overview: eventData.overview ?? null,
          contact: eventData.contact ?? null,
          eventType: eventData.eventType,
          prefectureId: prefectureId,
          areaId: areaId,
          cityId: cityId,
          ownerId: ownerId,
          tags:
            tagIds.length > 0
              ? {
                  connect: tagIds.map((id) => ({ id })),
                }
              : undefined,
        },
      })

      // 2. EventMediaを作成（EventのIDを使用）
      if (eventData.imageUrls && eventData.imageUrls.length > 0) {
        const mediaData = eventData.imageUrls.map((url) => ({
          url: url,
          eventId: event.id,
        }))

        await tx.eventMedia.createMany({
          data: mediaData,
        })
      }

      return event
    })

    return { success: true, eventId: result.id }
  } catch (error) {
    console.error('Event creation error:', error)
    return { success: false, errorMessage: 'イベントの作成に失敗しました' }
  }
}

// 単一イベント取得（全リレーション含む）
export const getEvent = async (
  eventId: string,
): Promise<EventWithFullRelations | null> => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      tags: true,
      prefecture: true,
      area: true,
      city: true,
      owner: true,
      attendees: true,
      medias: true,
    },
  })
  return event
}

// イベント一覧取得（基本リレーション + メディア）
export const getEvents = async (): Promise<EventWithBasicRelations[]> => {
  const events = await prisma.event.findMany({
    include: {
      tags: true,
      prefecture: true,
      area: true,
      city: true,
      medias: true,
    },
  })
  return events
}

// ユーザーのイベント一覧取得
export const getEventsByOwner = async (
  ownerId: string,
): Promise<EventWithBasicRelations[]> => {
  const events = await prisma.event.findMany({
    where: { ownerId },
    include: {
      tags: true,
      prefecture: true,
      area: true,
      city: true,
      medias: true,
    },
    orderBy: { startDateTime: 'desc' },
  })
  return events
}
