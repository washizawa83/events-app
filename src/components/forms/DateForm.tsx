'use client'

import { Calendar } from '@/features/calendars/Calendar'
import dayjs from 'dayjs'
import { useState } from 'react'
import { BsCalendar3 } from 'react-icons/bs'

type Props = {
  label: string
}

export const DateForm = ({ label }: Props) => {
  const currentDate = dayjs()
  const [value, setValue] = useState(currentDate.format('YYYY/MM/DD'))
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)

  return (
    <div className="flex flex-col flex-wrap">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <div className="relative flex w-48 items-center">
        <input
          className="h-8 w-full rounded-l-lg px-2 text-gray-800 outline-none"
          type="text"
          defaultValue={value}
          placeholder={currentDate.format('YYYY/MM/DD')}
        />
        <div>
          <button
            className="h-8 rounded-r-lg bg-valiantDark p-2"
            onClick={() => setIsOpenCalendar(!isOpenCalendar)}
          >
            <BsCalendar3 />
          </button>
          {isOpenCalendar && (
            <div className="absolute left-0 top-10">
              <Calendar
                handleSelectedDay={(day) => {
                  setValue(day.format('YYYY/MM/DD'))
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
