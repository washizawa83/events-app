import { Event } from '@prisma/client'
import dayjs from 'dayjs'

type Props = {
  event: Event
  selectedDate: dayjs.Dayjs
  oneHourBarWidthPx: number
}

const getStartDateTime = (event: Event, selectedDate: dayjs.Dayjs) => {
  if (event.startDateTime.getDate() < selectedDate.toDate().getDate()) {
    return selectedDate.hour(0).minute(0)
  }

  return dayjs(event.startDateTime)
}

const getEndDateTime = (event: Event, selectedDate: dayjs.Dayjs) => {
  if (event.endDateTime.getDate() > selectedDate.toDate().getDate()) {
    return selectedDate.hour(23).minute(59)
  }
  return dayjs(event.endDateTime)
}

const calcBarWidth = (
  event: Event,
  selectedDate: dayjs.Dayjs,
  oneHourBarWidthPx: number,
) => {
  const startDateTime = getStartDateTime(event, selectedDate)
  const endDateTime = getEndDateTime(event, selectedDate)
  const diffMinutes = endDateTime.diff(startDateTime, 'minute')

  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60

  return hours * oneHourBarWidthPx + minutes * (oneHourBarWidthPx / 60)
}

export const TimeLineScheduleBar = ({
  event,
  selectedDate,
  oneHourBarWidthPx,
}: Props) => {
  const barWidth = calcBarWidth(event, selectedDate, oneHourBarWidthPx)

  return (
    <div
      className="h-[30px] rounded-lg border border-accent bg-accent/[.4] px-2"
      style={{ width: `${barWidth}px` }}
    >
      <p className="line-clamp-1">{event.title}</p>
    </div>
  )
}
