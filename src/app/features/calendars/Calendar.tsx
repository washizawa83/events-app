'use client'

import { getMonthDays } from '@/app/utils/calendar/days-util'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
  isFullScreen?: boolean
  darkMode?: boolean
  handleSelectedDay: (day: dayjs.Dayjs) => void
}

const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const Calendar = ({
  isFullScreen = false,
  darkMode = false,
  handleSelectedDay,
}: Props) => {
  const currentDate = dayjs()
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(currentDate)
  const [selectedMonth, setSelectedMonth] = useState(currentDate)
  const [monthDays, setMonthDays] = useState(getMonthDays())

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
    setMonthDays(getMonthDays(selectedMonth))
  }, [selectedMonth])

  const isThisMonth = (day: dayjs.Dayjs): boolean => {
    return selectedMonth.format('YYYY/MMMM') === day.format('YYYY/MMMM')
  }

  const isThisDay = (day: dayjs.Dayjs): boolean => {
    return currentDate.format('YYYY/MMMM/DD') === day.format('YYYY/MMMM/DD')
  }

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden ${darkMode ? 'bg-valiant text-gray-100' : 'bg-slate-100 text-gray-800'}  ${isFullScreen && 'h-full'}`}
    >
      <div
        className={`flex items-center justify-center md:h-16 h-12 ${darkMode && 'bg-primary'}`}
      >
        <button
          className="flex items-center justify-center hover:bg-slate-300 w-8 h-8 rounded-full cursor-default ml-1"
          onClick={() => setMonthDelta(-1)}
        >
          <IoIosArrowBack />
        </button>
        <div className="w-40 mx-auto text-center">
          <span className="mx-2">{selectedMonth.format('YYYY')}</span>
          <span className="mx-2">{selectedMonth.format('MMMM')}</span>
        </div>
        <button
          className="flex items-center justify-center hover:bg-slate-300 w-8 h-8 rounded-full cursor-default mr-1"
          onClick={() => setMonthDelta(1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div
        className={`flex flex-col flex-grow border overflow-hidden ${darkMode ? 'border-primary' : 'border-gray-200'}`}
      >
        <div
          className={`flex items-center w-full border-b h-10 ${darkMode ? 'border-primary' : 'border-gray-200'}`}
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
              className={`flex items-center border-b last-of-type:border-none h-1/5 ${darkMode ? 'border-primary' : 'border-gray-200'}`}
            >
              {week.map((day, index) => (
                <button
                  className={`
										flex
										items-center
										justify-center
										basis-1/7
										text-center
										md:p-0
										py-2
										border-r
										last-of-type:border-none
										cursor-default
                    h-full
                    ${darkMode ? 'bg-valiant hover:bg-[#50505e] border-primary' : 'bg-slate-100 hover:bg-slate-300 border-gray-200'}
                    ${!isFullScreen && 'aspect-square'}
										${!isThisMonth(day) && (darkMode ? 'bg-valiantDark' : 'bg-slate-200')}
										${selectedDay?.format('YYYY/MM/DD') === day.format('YYYY/MM/DD') && 'text-accent'}
									`}
                  key={index}
                  onClick={() => selectDay(day)}
                >
                  <p
                    className={`flex items-center justify-center w-6 h-6 md:text-basic text-sm ${isThisDay(day) && 'rounded-full border border-accent'}`}
                  >
                    {day.format('D')}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
