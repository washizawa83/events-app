import {
  dayOfWeeks,
  isThisDay,
  isThisMonth,
} from '@/utils/calendar/calendar-util'
import { Event } from '@prisma/client'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
  isFullScreen?: boolean
  darkMode?: boolean
  handleSelectedDay: (day: dayjs.Dayjs) => void
  selectedDay: dayjs.Dayjs
  calendarDates: dayjs.Dayjs[]
  scheduleMap: Record<string, Event[]>
}

export const CalendarWithSchedule = ({
  isFullScreen = false,
  darkMode = false,
  handleSelectedDay,
  selectedDay,
  calendarDates,
  scheduleMap,
}: Props) => {
  const currentDate = dayjs()

  return (
    <div
      className={clsx(
        'flex flex-col overflow-hidden',
        isFullScreen ? 'h-full' : 'rounded-lg',
        darkMode ? 'bg-valiant text-gray-100' : 'bg-slate-100 text-gray-800',
      )}
    >
      <div
        className={clsx(
          'flex h-12 items-center justify-center md:h-16',
          darkMode && 'bg-primary',
        )}
      >
        <Link
          className="ml-1 flex h-8 w-8 cursor-default items-center justify-center rounded-full hover:bg-slate-300"
          href={`/calendar2/${selectedDay.subtract(1, 'month').format('YYYY-MM-DD')}`}
        >
          <IoIosArrowBack />
        </Link>
        <div className="mx-auto w-40 text-center">
          <span className="mx-2">{currentDate.format('YYYY')}</span>
          <span className="mx-2">{currentDate.format('MMMM')}</span>
        </div>
        <Link
          className="mr-1 flex h-8 w-8 cursor-default items-center justify-center rounded-full hover:bg-slate-300"
          href={`/calendar2/${selectedDay.add(1, 'month').format('YYYY-MM-DD')}`}
        >
          <IoIosArrowForward />
        </Link>
      </div>
      <div
        className={clsx(
          'flex flex-grow flex-col overflow-hidden border',
          darkMode ? 'border-primary' : 'border-gray-200',
        )}
      >
        <div
          className={clsx(
            'flex h-10 w-full items-center border-b',
            darkMode ? 'border-primary' : 'border-gray-200',
          )}
        >
          {dayOfWeeks.map((dayOfWeek) => (
            <div className="basis-1/7 text-center" key={dayOfWeek}>
              <p className="text-sm">{dayOfWeek}</p>
            </div>
          ))}
        </div>
        <div className="flex h-full flex-wrap">
          {calendarDates.map((day, index) => (
            <div
              key={index}
              className={clsx(
                'w-1/7 flex h-1/5 items-center border-b last-of-type:border-none',
                darkMode ? 'border-primary' : 'border-gray-200',
              )}
            >
              <button
                className={clsx(
                  'flex h-full w-full cursor-default cursor-pointer flex-col items-center justify-start border-r py-2 text-center last-of-type:border-none md:p-0',
                  darkMode
                    ? 'border-primary bg-valiant hover:bg-[#50505e]'
                    : 'border-gray-200 bg-slate-100 hover:bg-slate-300',
                  !isFullScreen && 'aspect-square',
                  !isThisMonth(day, currentDate) &&
                    (darkMode ? 'bg-valiantDark' : 'bg-slate-200'),
                  selectedDay?.format('YYYY/MM/DD') ===
                    day.format('YYYY/MM/DD') && 'text-accent',
                )}
                key={index}
                onClick={() => handleSelectedDay(day)}
              >
                <p
                  className={clsx(
                    'md:text-basic mt-2 flex h-6 w-6 items-center justify-center text-sm',
                    isThisDay(day, currentDate) &&
                      'rounded-full border border-accent',
                  )}
                >
                  {day.format('D')}
                </p>
                {scheduleMap[day.format('YYYY-MM-DD')] && (
                  <span className="mt-2 h-3 w-3 rounded-full bg-accent"></span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
