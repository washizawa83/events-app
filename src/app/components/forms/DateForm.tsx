'use client'

import { Calendar } from '@/app/features/calendars/Calendar'
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
    <div className="flex flex-wrap flex-col">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <div className="relative flex items-center w-48">
        <input
          className="h-8 outline-none rounded-l-lg px-2 text-gray-800 w-full"
          type="text"
          defaultValue={value}
          placeholder={currentDate.format('YYYY/MM/DD')}
        />
        <div>
          <button
            className="rounded-r-lg h-8 p-2 bg-valiantDark"
            onClick={() => setIsOpenCalendar(!isOpenCalendar)}
          >
            <BsCalendar3 />
          </button>
          {isOpenCalendar && (
            <div className="absolute top-10 left-0">
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
