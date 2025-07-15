'use client'

import {
  dayOfWeeks,
  isThisDay,
  isThisMonth,
} from '@/utils/calendar/calendar-util'
import { getCalendarDates } from '@/utils/calendar/days-util'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
  isFullScreen?: boolean
  darkMode?: boolean
  handleSelectedDay: (day: dayjs.Dayjs) => void
}

export const Calendar = ({
  isFullScreen = false,
  darkMode = false,
  handleSelectedDay,
}: Props) => {
  const currentDate = dayjs()
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(currentDate)
  const [selectedMonth, setSelectedMonth] = useState(currentDate)
  const [monthDays, setMonthDays] = useState(
    getCalendarDates(currentDate.year(), currentDate.month() + 1),
  )

  const setMonthDelta = (delta: number) => {
    setSelectedMonth((currentSelectedMonth) =>
      currentSelectedMonth.add(delta, 'month'),
    )
  }

  const selectDay = (day: dayjs.Dayjs) => {
    setSelectedDay(day)
    handleSelectedDay(day)
  }

  useEffect(() => {
    setMonthDays(
      getCalendarDates(selectedMonth.year(), selectedMonth.month() + 1),
    )
  }, [selectedMonth])

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
        <div className="flex h-full flex-wrap">
          {monthDays.map((day, index) => (
            <div
              key={index}
              className={`w-1/7 flex h-1/5 items-center border-b last-of-type:border-none ${darkMode ? 'border-primary' : 'border-gray-200'}`}
            >
              <button
                className={`flex h-full w-full cursor-default items-center justify-center border-r py-2 text-center last-of-type:border-none md:p-0 ${darkMode ? 'border-primary bg-valiant hover:bg-[#50505e]' : 'border-gray-200 bg-slate-100 hover:bg-slate-300'} ${!isFullScreen && 'aspect-square'} ${!isThisMonth(day, selectedMonth) && (darkMode ? 'bg-valiantDark' : 'bg-slate-200')} ${selectedDay?.format('YYYY/MM/DD') === day.format('YYYY/MM/DD') && 'text-accent'} `}
                key={index}
                onClick={() => selectDay(day)}
              >
                <p
                  className={`md:text-basic flex h-6 w-6 items-center justify-center text-sm ${isThisDay(day, currentDate) && 'rounded-full border border-accent'}`}
                >
                  {day.format('D')}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
