import { TimeLineSchedule } from '@/features/calendars/timeline/TimeLineSchedule'
import { createRangeArray } from '@/utils/array-util'
import { Event } from '@prisma/client'
import dayjs from 'dayjs'

type Props = {
  events: Event[]
  selectedDate: dayjs.Dayjs
}

const dayHours = 24
const oneHourBarWidthPx = 100

export const TimeLine = ({ events, selectedDate }: Props) => {
  const dayHoursLengthList = createRangeArray(dayHours)

  return (
    <div className="flex h-full w-full overflow-x-scroll px-4">
      <div className="flex h-full w-full min-w-[2400px] flex-col">
        <div className="flex w-full bg-primary">
          {dayHoursLengthList.map((_, hour) => (
            <div
              key={hour}
              className="relative h-8"
              style={{ width: `${oneHourBarWidthPx}px` }}
            >
              <p className={`absolute -left-${hour.toString().length} top-0`}>
                {hour}
              </p>
            </div>
          ))}
        </div>
        <div className="relative h-full overflow-y-scroll">
          <div className="absolute flex h-full">
            {dayHoursLengthList.map((_, hour) => (
              <div
                key={hour}
                className="left-0 top-0 -z-10 h-full w-full border-l border-gray-500"
                style={{ width: `${oneHourBarWidthPx}px` }}
              ></div>
            ))}
          </div>
          {events.map((event) => (
            <TimeLineSchedule
              key={event.id}
              event={event}
              selectedDate={selectedDate}
              oneHourBarWidthPx={oneHourBarWidthPx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
