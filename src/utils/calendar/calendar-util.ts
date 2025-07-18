import { Event } from '@prisma/client'
import dayjs from 'dayjs'

export const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const isThisMonth = (
  day: dayjs.Dayjs,
  selectedMonth: dayjs.Dayjs,
): boolean => {
  return selectedMonth.format('YYYY/MMMM') === day.format('YYYY/MMMM')
}

export const isThisDay = (
  day: dayjs.Dayjs,
  currentDate: dayjs.Dayjs,
): boolean => {
  return currentDate.format('YYYY/MMMM/DD') === day.format('YYYY/MMMM/DD')
}

export const generateCalendarSchedule = (events: Event[]) => {
  if (events.length === 0) {
    return {}
  }

  const scheduleMap: { [key: string]: Event[] } = {}

  events.forEach((event) => {
    const startDate = dayjs(event.startDateTime)
    const endDate = dayjs(event.endDateTime)

    // 開始日から終了日まで日付を取得
    let currentDate = startDate.startOf('day')
    const finalDate = endDate.startOf('day')

    // 開始日から終了日まで（終了日を含む）ループ
    while (currentDate.isSame(finalDate) || currentDate.isBefore(finalDate)) {
      const dateKey = currentDate.format('YYYY-MM-DD') // 年-月-日の形式でキーを作成

      // そのキーが存在しない場合は空配列で初期化
      if (!scheduleMap[dateKey]) {
        scheduleMap[dateKey] = []
      }

      // イベントを追加
      scheduleMap[dateKey].push(event)

      // 次の日へ
      currentDate = currentDate.add(1, 'day')
    }
  })

  return scheduleMap
}
