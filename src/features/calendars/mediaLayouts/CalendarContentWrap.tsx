'use client'

import { DesktopCalendar } from '@/features/calendars/mediaLayouts/DesktopCalendar'
import { MobileCalendar } from '@/features/calendars/mediaLayouts/MobileCalendar'
import { getCalendarDates } from '@/utils/calendar/days-util'
import { Event } from '@prisma/client'
import dayjs from 'dayjs'
import { useState } from 'react'

export const scheduleTypes = ['LIST', 'TIMELINE'] as const

type Props = {
  selectedDate: Date
  scheduleMap: Record<string, Event[]>
}

export const CalendarContentWrap = ({ selectedDate, scheduleMap }: Props) => {
  const [displayScheduleType, setDisplayScheduleType] = useState<
    (typeof scheduleTypes)[number]
  >(scheduleTypes[0])
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(
    dayjs(selectedDate),
  )
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>(
    scheduleMap?.[dayjs(selectedDate).format('YYYY-MM-DD')] || [],
  )
  const selectedMonth = dayjs(selectedDate).format('YYYY-MM')

  const calendarDates = getCalendarDates(
    dayjs(selectedDate).year(),
    dayjs(selectedDate).month() + 1,
  )

  const handleSelectDay = (day: dayjs.Dayjs) => {
    setSelectedDay(day)
    setSelectedDayEvents(scheduleMap?.[day.format('YYYY-MM-DD')] || [])
  }

  return (
    <>
      <div className="sm:hidden">
        <MobileCalendar
          selectedDay={selectedDay}
          selectedDate={dayjs(selectedDate)}
          selectedMonth={selectedMonth}
          displayScheduleType={displayScheduleType}
          selectedDayEvents={selectedDayEvents}
          handleSelectDay={handleSelectDay}
          calendarDates={calendarDates}
          scheduleMap={scheduleMap}
        />
      </div>
      <div className="hidden sm:block">
        <DesktopCalendar
          selectedDay={dayjs(selectedDay)}
          selectedDate={dayjs(selectedDate)}
          selectedMonth={selectedMonth}
          displayScheduleType={displayScheduleType}
          selectedDayEvents={selectedDayEvents}
          handleSelectDay={handleSelectDay}
          calendarDates={calendarDates}
          scheduleMap={scheduleMap}
        />
      </div>
    </>
  )
}
