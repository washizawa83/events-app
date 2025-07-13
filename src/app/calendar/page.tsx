'use client'

import { Button } from '@/components/forms/Button'
import { SelectButtons } from '@/components/forms/SelectButtons'
import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { CalendarScheduleList } from '@/features/calendars/CalendarScheduleList'
import { CalendarWithSchedule } from '@/features/calendars/CalendarWithSchedule'
import { Event, EventStatus, EventType } from '@prisma/client'
import dayjs from 'dayjs'
import { useState } from 'react'

enum CalendarScope {
  year,
  month,
  week,
}

// const events = [
//   {
//     id: '00',
//     title: 'オールナイトイベント',
//     startTime: dayjs().add(-1, 'day').hour(22).minute(0),
//     endTime: dayjs().hour(6).minute(0),
//   },
//   {
//     id: '01',
//     title: '沖縄ご当地フェア in 長野',
//     startTime: dayjs().hour(9).minute(15),
//     endTime: dayjs().hour(11).minute(30),
//   },
//   {
//     id: '02',
//     title: '京都ご当地フェア in 長野',
//     startTime: dayjs().hour(12).minute(0),
//     endTime: dayjs().hour(13).minute(30),
//   },
//   {
//     id: '03',
//     title: 'MHW ゲーム配信',
//     startTime: dayjs().hour(18).minute(0),
//     endTime: dayjs().hour(20).minute(0),
//   },
//   {
//     id: '04',
//     title: '歯医者',
//     startTime: dayjs().hour(18).minute(0),
//     endTime: dayjs().hour(18).minute(30),
//   },
//   {
//     id: '05',
//     title: 'ハウスダーツ大会',
//     startTime: dayjs().hour(22).minute(0),
//     endTime: dayjs().hour(24).minute(0),
//   },
//   {
//     id: '06',
//     title: 'マイクラ ゲーム配信',
//     startTime: dayjs().hour(20).minute(0),
//     endTime: dayjs().add(1, 'day').hour(2).minute(30),
//   },
//   {
//     id: '07',
//     title: 'テックカンファレンス',
//     startTime: dayjs().hour(18).minute(0),
//     endTime: dayjs().hour(18).minute(30),
//   },
// ]

const events: Event[] = [
  {
    id: '00',
    title: 'ジャパンカップ',
    description: '日本最高峰のレース大会',
    startDateTime: dayjs().hour(10).minute(0).toDate(),
    endDateTime: dayjs().hour(14).minute(30).toDate(),
    locationDetail: '鈴鹿市 鈴鹿サーキット',
    prefectureId: '00',
    areaId: '00',
    cityId: '00',
    eventType: EventType.HYBRID,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '00',
    conditions: null,
    maxCapacity: null,
    overview: null,
    contact: null,
  },
  {
    id: '01',
    title: 'テックカンファレンス 2024',
    description: '最新技術トレンドを学ぶカンファレンス',
    startDateTime: dayjs().hour(9).minute(0).toDate(),
    endDateTime: dayjs().hour(17).minute(0).toDate(),
    locationDetail: '渋谷区 渋谷ヒカリエ',
    prefectureId: '13',
    areaId: '13',
    cityId: '13',
    eventType: EventType.OFFLINE,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '01',
    conditions: 'エンジニア経験者優先',
    maxCapacity: '300',
    overview: 'AI、Web3、クラウドなどの最新技術について学べます',
    contact: 'tech-conf@example.com',
  },
  {
    id: '02',
    title: 'オンライン英会話セミナー',
    description: 'ビジネス英語スキルアップセミナー',
    startDateTime: dayjs().hour(19).minute(0).toDate(),
    endDateTime: dayjs().hour(21).minute(0).toDate(),
    locationDetail: 'Zoomオンライン',
    prefectureId: '00',
    areaId: '00',
    cityId: '00',
    eventType: EventType.ONLINE,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '02',
    conditions: 'TOEIC600点以上',
    maxCapacity: '50',
    overview: 'プレゼンテーションやミーティングで使える実践的な英語を学習',
    contact: 'english@example.com',
  },
  {
    id: '03',
    title: '大阪グルメフェス',
    description: '関西の美味しいグルメが集結',
    startDateTime: dayjs().hour(11).minute(0).toDate(),
    endDateTime: dayjs().hour(20).minute(0).toDate(),
    locationDetail: '大阪市 大阪城公園',
    prefectureId: '27',
    areaId: '27',
    cityId: '27',
    eventType: EventType.OFFLINE,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '03',
    conditions: null,
    maxCapacity: '5000',
    overview: 'たこ焼き、お好み焼き、串カツなど大阪名物が勢揃い',
    contact: 'gourmet-fest@osaka.com',
  },
  {
    id: '04',
    title: 'ヨガ&マインドフルネス体験',
    description: '心身のリラックスとデトックス',
    startDateTime: dayjs().hour(8).minute(0).toDate(),
    endDateTime: dayjs().hour(10).minute(0).toDate(),
    locationDetail: '横浜市 赤レンガ倉庫',
    prefectureId: '14',
    areaId: '14',
    cityId: '14',
    eventType: EventType.HYBRID,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '04',
    conditions: '初心者歓迎',
    maxCapacity: '30',
    overview: '朝の清々しい空気の中で行うヨガとマインドフルネス瞑想',
    contact: 'yoga@wellness.jp',
  },
  {
    id: '05',
    title: 'スタートアップピッチイベント',
    description: '次世代起業家によるビジネスプレゼン大会',
    startDateTime: dayjs().add(-1, 'day').hour(14).minute(0).toDate(),
    endDateTime: dayjs().hour(18).minute(0).toDate(),
    locationDetail: '名古屋市 ナディアパーク',
    prefectureId: '23',
    areaId: '23',
    cityId: '23',
    eventType: EventType.OFFLINE,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '05',
    conditions: '投資家・起業家・学生歓迎',
    maxCapacity: '200',
    overview:
      '革新的なアイデアを持つスタートアップが集結し、投資家にピッチを行います',
    contact: 'pitch@startup-nagoya.com',
  },
  {
    id: '06',
    title: 'エンドアップピッチイベント',
    description: '次世代起業家によるビジネスプレゼン大会',
    startDateTime: dayjs().hour(14).minute(0).toDate(),
    endDateTime: dayjs().add(1, 'day').hour(18).minute(0).toDate(),
    locationDetail: '名古屋市 ナディアパーク',
    prefectureId: '23',
    areaId: '23',
    cityId: '23',
    eventType: EventType.OFFLINE,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '05',
    conditions: '投資家・起業家・学生歓迎',
    maxCapacity: '200',
    overview:
      '革新的なアイデアを持つスタートアップが集結し、投資家にピッチを行います',
    contact: 'pitch@startup-nagoya.com',
  },
  {
    id: '06',
    title: '来月のイベント',
    description: '次世代起業家によるビジネスプレゼン大会',
    startDateTime: dayjs().add(1, 'month').hour(14).minute(0).toDate(),
    endDateTime: dayjs()
      .add(1, 'month')
      .add(1, 'day')
      .hour(18)
      .minute(0)
      .toDate(),
    locationDetail: '名古屋市 ナディアパーク',
    prefectureId: '23',
    areaId: '23',
    cityId: '23',
    eventType: EventType.OFFLINE,
    eventStatus: EventStatus.SCHEDULED,
    ownerId: '05',
    conditions: '投資家・起業家・学生歓迎',
    maxCapacity: '200',
    overview:
      '革新的なアイデアを持つスタートアップが集結し、投資家にピッチを行います',
    contact: 'pitch@startup-nagoya.com',
  },
]

const scheduleTypes = ['LIST', 'TIMELINE'] as const

const CalendarPage = () => {
  const [calendarScope, setCalendarScope] = useState<CalendarScope>(
    CalendarScope.month,
  )

  const handleSelectedCalendarScope = (selected: number) => {
    setCalendarScope(selected)
  }

  const currentDate = dayjs()
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(currentDate)
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([])

  const [displayScheduleType, setDisplayScheduleType] = useState<
    (typeof scheduleTypes)[number]
  >(scheduleTypes[0])

  return (
    <BasePageLayout>
      <div className="flex">
        <div className="flex h-pageHeight w-96 flex-col">
          <div className="flex h-full w-full flex-col">
            <div className="flex h-12 justify-between bg-primary p-2 md:h-16">
              <div>
                <Button
                  label="イベントを追加"
                  size="s"
                  handleClick={() => {}}
                />
              </div>
              <div>
                <SelectButtons
                  label=""
                  buttonLabels={['イベントリスト', 'タイムライン']}
                  selected={0}
                  handleSelected={(selected) => {
                    setDisplayScheduleType(scheduleTypes[selected])
                  }}
                />
              </div>
            </div>
            {displayScheduleType === 'LIST' && (
              <CalendarScheduleList selectedDayEvents={selectedDayEvents} />
            )}
          </div>
        </div>
        <div className="h-pageHeight flex-grow">
          <CalendarWithSchedule
            isFullScreen={true}
            darkMode={true}
            handleSelectedDay={() => {}}
            events={events}
            setSelectedDayEvents={setSelectedDayEvents}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
      </div>
    </BasePageLayout>
  )
}

export default CalendarPage
