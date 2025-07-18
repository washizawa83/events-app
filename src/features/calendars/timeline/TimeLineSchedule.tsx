import { TimeLineScheduleBar } from '@/features/calendars/timeline/TimeLineScheduleCell'
import { Event } from '@prisma/client'
import dayjs from 'dayjs'

type Props = {
  event: Event
  selectedDate: dayjs.Dayjs
  oneHourBarWidthPx: number
}

const maxDayMinutes = 1440

const calcBetweenMinutes = (event: Event, selectedDate: dayjs.Dayjs) => {
  const betweenMinutes = dayjs(event.startDateTime).diff(
    selectedDate.hour(0).minute(0),
    'minute',
  )

  if (betweenMinutes > maxDayMinutes) {
    return maxDayMinutes
  }

  return betweenMinutes
}

const getScheduleBarPosition = (
  event: Event,
  selectedDate: dayjs.Dayjs,
  oneHourBarWidthPx: number,
) => {
  const betweenMinutes = calcBetweenMinutes(event, selectedDate)

  if (betweenMinutes < 0) {
    return 0
  }

  const hours = Math.floor(betweenMinutes / 60)
  const minutes = betweenMinutes % 60

  return hours * oneHourBarWidthPx + minutes * (oneHourBarWidthPx / 60)
}

export const TimeLineSchedule = ({
  event,
  selectedDate,
  oneHourBarWidthPx,
}: Props) => {
  const scheduleBarPosition = getScheduleBarPosition(
    event,
    selectedDate,
    oneHourBarWidthPx,
  )
  return (
    <div className="relative flex h-[50px] w-full items-center">
      <div className="absolute" style={{ left: `${scheduleBarPosition}px` }}>
        <TimeLineScheduleBar
          event={event}
          selectedDate={selectedDate}
          oneHourBarWidthPx={oneHourBarWidthPx}
        />
      </div>
    </div>
  )
}
