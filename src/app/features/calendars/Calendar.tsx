'use client'

import { getMonthDays } from '@/app/utils/calendar/days-util'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
  handleSelectedDay: (day: dayjs.Dayjs) => void
}

const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const Calendar = ({ handleSelectedDay }: Props) => {
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [monthDays, setMonthDays] = useState(getMonthDays())
  const currentDate = dayjs()

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
    <div className="bg-slate-100">
      <div className="flex items-center justify-center md:h-16 h-12">
        <button
          className="flex items-center justify-center hover:bg-slate-300 w-8 h-8 rounded-full cursor-default"
          onClick={() => setMonthDelta(-1)}
        >
          <IoIosArrowBack />
        </button>
        <div className="w-40 mx-10 text-center">
          <span className="mx-2">{selectedMonth.format('YYYY')}</span>
          <span className="mx-2">{selectedMonth.format('MMMM')}</span>
        </div>
        <button
          className="flex items-center justify-center hover:bg-slate-300 w-8 h-8 rounded-full cursor-default"
          onClick={() => setMonthDelta(1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="border rounded-2xl border-gray-200 overflow-hidden">
        <div className="flex items-center w-full border-b">
          {dayOfWeeks.map((dayOfWeek) => (
            <div className="basis-1/7 text-center" key={dayOfWeek}>
              <p>{dayOfWeek}</p>
            </div>
          ))}
        </div>
        <div>
          {monthDays.map((week, index) => (
            <div
              key={index}
              className="flex items-center border-b last-of-type:border-none"
            >
              {week.map((day, index) => (
                <button
                  className={`
										flex
										items-center
										justify-center
										basis-1/7
										text-center
										aspect-2/1
										md:p-0
										py-2
										border-r
										last-of-type:border-none
										hover:bg-slate-300
										cursor-default
										${!isThisMonth(day) && 'bg-slate-200'}
										${selectedDay === day && 'text-pink-400'}
									`}
                  key={index}
                  onClick={() => selectDay(day)}
                >
                  <p
                    className={`flex items-center justify-center w-6 h-6 ${isThisDay(day) && 'rounded-full border border-pink-400'}`}
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
