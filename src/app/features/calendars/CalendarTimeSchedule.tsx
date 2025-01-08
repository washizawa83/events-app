'use client'

import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'

type Props = {
  events: ScheduleEvent[]
  timeScheduleWidth: number
}

type EventElementParam = {
  top: number
  left: number
  height: number
  width: number
  title: string
  startTime: Dayjs
  endTime: Dayjs
}

type ScheduleEvent = {
  id: string
  title: string
  startTime: Dayjs
  endTime: Dayjs
}

const TimeSchedulePaddingPx = 8
const TimeLineRowHeightPx = 80
const TimeQuarterHeight = TimeLineRowHeightPx / 4
const TimeLineRowBorderMargin = 12
const timeLineWidthPct = 20
const eventCellWidthPct = 100 - timeLineWidthPct

const Times = [
  'AM12:00',
  'AM01:00',
  'AM02:00',
  'AM03:00',
  'AM04:00',
  'AM05:00',
  'AM06:00',
  'AM07:00',
  'AM08:00',
  'AM09:00',
  'AM10:00',
  'AM11:00',
  'PM12:00',
  'PM01:00',
  'PM02:00',
  'PM03:00',
  'PM04:00',
  'PM05:00',
  'PM06:00',
  'PM07:00',
  'PM08:00',
  'PM09:00',
  'PM10:00',
  'PM11:00',
]

const createArray = (length: number) => {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`Error createArray requires positive integer`)
  }
  return [...Array(length)]
}

const sortEventsByStartTime = (events: ScheduleEvent[]) => {
  return events.sort((a, b) => {
    if (a.startTime.hour() === b.startTime.hour()) {
      return a.endTime.diff(a.startTime, 'hour') >
        b.endTime.diff(b.startTime, 'hour')
        ? -1
        : 1
    }
    return a.startTime.hour() > b.startTime.hour() ? 1 : -1
  })
}

const createScheduleMap = (sortedEvents: ScheduleEvent[]) => {
  const scheduleMap: { [key: number]: ScheduleEvent[] } = {}
  sortedEvents.forEach((event) => {
    const startTimeHour = event.startTime.hour()
    const eventTimeScope = event.endTime.diff(event.startTime, 'hour')

    // 開始・終了時間が同一の場合
    if (eventTimeScope === 0) {
      scheduleMap[startTimeHour] = scheduleMap[startTimeHour] || []
      scheduleMap[startTimeHour].push(event)
      return
    }
    createArray(eventTimeScope).forEach((_, index) => {
      const key = startTimeHour + index
      scheduleMap[key] = scheduleMap[key] || []
      scheduleMap[key].push(event)
      return
    })
  })
  return scheduleMap
}

const getQuarterTime = (minute: number) => {
  const quarterTime = 15
  return Math.floor(minute / quarterTime)
}

const convertEvents = (sortedEvents: ScheduleEvent[]): ScheduleEvent[] => {
  return sortedEvents.map((event) => {
    const startTime =
      event.startTime.date() === dayjs().date()
        ? event.startTime
        : dayjs().hour(0).minute(0).second(0)
    const endTime =
      event.endTime.date() === dayjs().date()
        ? event.endTime
        : dayjs().hour(24).minute(0).second(0)
    return {
      ...event,
      startTime,
      endTime,
    }
  })
}

const isNowHour = (time: string) => {
  return dayjs().format('Ahh') + ':00' === time
}

export const CalendarTimeSchedule = ({ events, timeScheduleWidth }: Props) => {
  const [eventCellParams, setEventCellParams] = useState<EventElementParam[]>(
    [],
  )
  const ref = React.createRef<HTMLSpanElement>()
  const timeLineWidth = timeScheduleWidth * (timeLineWidthPct * 0.01)
  const eventCellWidth = timeScheduleWidth * (eventCellWidthPct * 0.01)

  const calcScheduleTop = (event: ScheduleEvent) => {
    return (
      event.startTime.hour() * TimeLineRowHeightPx +
      TimeLineRowBorderMargin +
      getQuarterTime(event.startTime.minute()) * TimeQuarterHeight
    )
  }

  const calcScheduleHeight = (event: ScheduleEvent) => {
    const totalMinute = event.endTime.diff(event.startTime, 'minute')
    const hour = Math.floor(totalMinute / 60)
    const minute = totalMinute % 60
    return (
      hour * TimeLineRowHeightPx + getQuarterTime(minute) * TimeQuarterHeight
    )
  }

  const calcScheduleWidth = (
    scheduleMap: { [key: number]: ScheduleEvent[] },
    event: ScheduleEvent,
  ) => {
    return eventCellWidth / scheduleMap[event.startTime.hour()].length
  }

  const calcScheduleElementLeftPx = (
    scheduleMap: { [key: number]: ScheduleEvent[] },
    event: ScheduleEvent,
  ) => {
    const startTimeHour = event.startTime.hour()
    if (
      scheduleMap[startTimeHour].findIndex(
        (schedule) => schedule.id === event.id,
      ) === 0
    ) {
      return timeLineWidth + TimeSchedulePaddingPx
    }

    const scheduleLineMargin =
      timeLineWidth +
      TimeSchedulePaddingPx +
      scheduleMap[startTimeHour].findIndex(
        (schedule) => schedule.id === event.id,
      )

    const someTimeScheduleMargin =
      calcScheduleWidth(scheduleMap, event) *
      scheduleMap[startTimeHour].findIndex(
        (schedule) => schedule.id === event.id,
      )

    return scheduleLineMargin + someTimeScheduleMargin
  }

  useEffect(() => {
    const createEventCellElementParams = () => {
      const convertedEvents = convertEvents(events)
      const sortedEvents = sortEventsByStartTime(convertedEvents)
      const scheduleMap = createScheduleMap(sortedEvents)

      return sortedEvents.map((event) => {
        return {
          ...event,
          top: calcScheduleTop(event),
          left: calcScheduleElementLeftPx(scheduleMap, event),
          height: calcScheduleHeight(event),
          width: calcScheduleWidth(scheduleMap, event),
        }
      })
    }
    setEventCellParams(createEventCellElementParams())

    ref!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [events])

  return (
    <div className="relative w-full h-full px-2">
      {Times.map((time) => (
        <div
          key={time}
          className="flex"
          style={{ height: `${TimeLineRowHeightPx}px` }}
        >
          <span
            className={`${isNowHour(time) && 'text-accent'}`}
            style={{ width: `${timeLineWidth}px` }}
            ref={isNowHour(time) ? ref : undefined}
          >
            {time}
          </span>
          <div
            className={`relative h-full border-t ${isNowHour(time) && 'border-accent'}`}
            style={{
              marginTop: `${TimeLineRowBorderMargin}px`,
              width: `${eventCellWidth}px`,
            }}
          ></div>
        </div>
      ))}
      {eventCellParams.map((event, index) => (
        <div
          key={index}
          className="absolute flex bg-accent/50 rounded-lg overflow-hidden"
          style={{
            top: event.top,
            left: event.left,
            height: event.height,
            width: event.width,
          }}
        >
          <div className="absolute w-1 h-full bg-accent"></div>
          <div className="px-2">{event.title}</div>
        </div>
      ))}
    </div>
  )
}
