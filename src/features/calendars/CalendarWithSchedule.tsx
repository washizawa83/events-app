import {
  dayOfWeeks,
  generateCalendarSchedule,
  isThisDay,
  isThisMonth,
} from '@/utils/calendar/calendar-util'
import { getMonthDays } from '@/utils/calendar/days-util'
import { Event } from '@prisma/client'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
  isFullScreen?: boolean
  darkMode?: boolean
  handleSelectedDay: (day: dayjs.Dayjs) => void
  events: Event[]
  setSelectedDayEvents: (events: Event[]) => void
  selectedDay: dayjs.Dayjs
  setSelectedDay: (day: dayjs.Dayjs) => void
}

export const CalendarWithSchedule = ({
  isFullScreen = false,
  darkMode = false,
  handleSelectedDay,
  events,
  setSelectedDayEvents,
  selectedDay,
  setSelectedDay,
}: Props) => {
  const [selectedMonth, setSelectedMonth] = useState(selectedDay)
  const [monthDays, setMonthDays] = useState(getMonthDays())
  const [scheduleMap, setScheduleMap] = useState<{ [key: string]: Event[] }>({})

  const setMonthDelta = (delta: number) => {
    setSelectedMonth((currentSelectedMonth) =>
      currentSelectedMonth.add(delta, 'month'),
    )
  }

  const selectDay = (day: dayjs.Dayjs) => {
    setSelectedDay(day)
    handleSelectedDay(day)
    setSelectedDayEvents(scheduleMap?.[day.format('YYYY-MM-DD')] || [])
  }

  useEffect(() => {
    setMonthDays(getMonthDays(selectedMonth))
    setScheduleMap(generateCalendarSchedule(events))
  }, [selectedMonth])

  // 初回マウント時に一回だけ実行
  useEffect(() => {
    let newScheduleMap = generateCalendarSchedule(events)
    setSelectedDayEvents(
      newScheduleMap?.[selectedDay.format('YYYY-MM-DD')] || [],
    )
  }, [])

  return (
    <div
      className={`flex flex-col overflow-hidden ${isFullScreen ? 'h-full' : 'rounded-lg'} ${darkMode ? 'bg-valiant text-gray-100' : 'bg-slate-100 text-gray-800'}`}
    >
      <div
        className={`flex h-12 items-center justify-center md:h-16 ${darkMode && 'bg-primary'}`}
      >
        <button
          className="ml-1 flex h-8 w-8 cursor-default items-center justify-center rounded-full hover:bg-slate-300"
          onClick={() => setMonthDelta(-1)}
        >
          <IoIosArrowBack />
        </button>
        <div className="mx-auto w-40 text-center">
          <span className="mx-2">{selectedMonth.format('YYYY')}</span>
          <span className="mx-2">{selectedMonth.format('MMMM')}</span>
        </div>
        <button
          className="mr-1 flex h-8 w-8 cursor-default items-center justify-center rounded-full hover:bg-slate-300"
          onClick={() => setMonthDelta(1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div
        className={`flex flex-grow flex-col overflow-hidden border ${darkMode ? 'border-primary' : 'border-gray-200'}`}
      >
        <div
          className={`flex h-10 w-full items-center border-b ${darkMode ? 'border-primary' : 'border-gray-200'}`}
        >
          {dayOfWeeks.map((dayOfWeek) => (
            <div className="basis-1/7 text-center" key={dayOfWeek}>
              <p className="text-sm">{dayOfWeek}</p>
            </div>
          ))}
        </div>
        <div className="h-full">
          {monthDays.map((week, index) => (
            <div
              key={index}
              className={`flex h-1/5 items-center border-b last-of-type:border-none ${darkMode ? 'border-primary' : 'border-gray-200'}`}
            >
              {week.map((day, index) => (
                <button
                  className={`flex h-full basis-1/7 cursor-default cursor-pointer flex-col items-center justify-start border-r py-2 text-center last-of-type:border-none md:p-0 ${darkMode ? 'border-primary bg-valiant hover:bg-[#50505e]' : 'border-gray-200 bg-slate-100 hover:bg-slate-300'} ${!isFullScreen && 'aspect-square'} ${!isThisMonth(day, selectedMonth) && (darkMode ? 'bg-valiantDark' : 'bg-slate-200')} ${selectedDay?.format('YYYY/MM/DD') === day.format('YYYY/MM/DD') && 'text-accent'} `}
                  key={index}
                  onClick={() => selectDay(day)}
                >
                  <p
                    className={`md:text-basic mt-2 flex h-6 w-6 items-center justify-center text-sm ${isThisDay(day, selectedDay) && 'rounded-full border border-accent'}`}
                  >
                    {day.format('D')}
                  </p>
                  {scheduleMap[day.format('YYYY-MM-DD')] && (
                    <span className="mt-2 h-3 w-3 rounded-full bg-accent"></span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
