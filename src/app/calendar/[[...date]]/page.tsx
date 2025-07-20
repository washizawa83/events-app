import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { CalendarContentWrap } from '@/features/calendars/mediaLayouts/CalendarContentWrap'
import { mockEvents } from '@/services/calendar/calendar'
import { generateCalendarSchedule } from '@/utils/calendar/calendar-util'
import {
  getCalendarEndDate,
  getCalendarStartDate,
} from '@/utils/calendar/days-util'

const convertSelectedDate = (dateArray?: string[]) => {
  // dateArrayが空またはundefinedの場合、現在の日付を返す
  if (!dateArray || dateArray.length === 0) {
    return new Date()
  }

  // 最初の要素を日付として使用
  const date = dateArray[0]

  if (!date) {
    return new Date()
  }

  try {
    return new Date(date)
  } catch (error) {
    return new Date()
  }
}

const CalendarPage2 = async ({
  params,
}: {
  params: Promise<{ date?: string[] }>
}) => {
  const { date } = await params
  const convertedSelectedDate = convertSelectedDate(date)

  const calendarStartDate = getCalendarStartDate(
    convertedSelectedDate.getFullYear(),
    convertedSelectedDate.getMonth() + 1,
  )

  const calendarEndDate = getCalendarEndDate(
    convertedSelectedDate.getFullYear(),
    convertedSelectedDate.getMonth() + 1,
  )

  const events = mockEvents
  const scheduleMap = generateCalendarSchedule(events)

  return (
    <BasePageLayout>
      <CalendarContentWrap
        selectedDate={convertedSelectedDate}
        scheduleMap={scheduleMap}
      />
    </BasePageLayout>
  )
}

export default CalendarPage2
