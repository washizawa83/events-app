'use client'

import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

type EventElementParam = {
  top: number
  left: number
  height: number
  width: number
  title: string
  schedule: Dayjs
  startTime: Dayjs
  endTime: Dayjs
}

type ScheduleEvent = {
  id: string
  title: string
  schedule: Dayjs
  startTime: Dayjs
  endTime: Dayjs
}

type ScheduleEventElementParam = {
  isStart: boolean
} & ScheduleEvent

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

const ScheduleMap: { [key: number]: (ScheduleEventElementParam | never)[] } = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [],
  14: [],
  15: [],
  16: [],
  17: [],
  18: [],
  19: [],
  20: [],
  21: [],
  22: [],
  23: [],
}

const HourHeightPx = 80
const TimeScheduleClearanceTopPx = 21
const TimeScheduleClearanceLeftPx = 90
const scheduleWidth = 323

const events = [
  {
    id: '01',
    title: '沖縄ご当地フェア in 長野',
    schedule: dayjs(),
    startTime: dayjs().add(-1, 'hour'),
    endTime: dayjs().add(1, 'hour'),
  },
  {
    id: '02',
    title: '京都ご当地フェア in 長野',
    schedule: dayjs(),
    startTime: dayjs(),
    endTime: dayjs().add(1, 'hour'),
  },
  {
    id: '03',
    title: 'MHW ゲーム配信',
    schedule: dayjs(),
    startTime: dayjs().add(2, 'hour'),
    endTime: dayjs().add(4, 'hour'),
  },
  {
    id: '04',
    title: '歯医者',
    schedule: dayjs(),
    startTime: dayjs().add(2, 'hour'),
    endTime: dayjs().add(3, 'hour'),
  },
  {
    id: '05',
    title: 'MHW ゲーム配信2',
    schedule: dayjs(),
    startTime: dayjs().add(2, 'hour'),
    endTime: dayjs().add(4, 'hour'),
  },
  {
    id: '06',
    title: 'マイクラ ゲーム配信2',
    schedule: dayjs(),
    startTime: dayjs().add(3, 'hour'),
    endTime: dayjs().add(4, 'hour'),
  },
]

const sortEventsByStartTime = () => {
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

const createArray = (length: number) => {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`Error createArray requires positive integer`)
  }
  return [...Array(length)]
}

const calcScheduleWidth = (
  scheduleMap: { [key: number]: ScheduleEventElementParam[] },
  event: ScheduleEvent,
) => {
  return scheduleWidth / scheduleMap[event.startTime.hour()].length
}

const calcScheduleElementLeftPx = (
  scheduleMap: { [key: number]: ScheduleEventElementParam[] },
  event: ScheduleEvent,
) => {
  const leftMargin = 4
  if (
    scheduleMap[event.startTime.hour()].findIndex(
      (schedule) => schedule.id === event.id,
    ) === 0
  ) {
    return TimeScheduleClearanceLeftPx
  }

  const scheduleLineMargin =
    TimeScheduleClearanceLeftPx +
    scheduleMap[event.startTime.hour()].findIndex(
      (schedule) => schedule.id === event.id,
    )
  const someTimeScheduleMargin =
    calcScheduleWidth(scheduleMap, event) *
    scheduleMap[event.startTime.hour()]
      // .filter((schedule) => schedule.isStart)
      .findIndex((schedule) => schedule.id === event.id)
  const scheduleTimeLabelMargin = scheduleMap[event.startTime.hour()].every(
    (schedule) => schedule.isStart,
  )
    ? 0
    : leftMargin *
      scheduleMap[event.startTime.hour()].findIndex(
        (schedule) => schedule.id === event.id,
      )

  return scheduleLineMargin + someTimeScheduleMargin
}

export const CalendarTimeLine = () => {
  const currentDateTime = dayjs()
  const [eventElementParams, setEventElementParams] = useState<
    EventElementParam[]
  >([])

  const isNowHour = (time: string) => {
    return currentDateTime.format('Ahh') + ':00' === time
  }

  useEffect(() => {
    const createScheduleItemElementParams = () => {
      const scheduleMap = { ...ScheduleMap }
      const sortedEvents = sortEventsByStartTime()
      sortedEvents.forEach((event) => {
        const fromStartToEndTimes = event.endTime.diff(event.startTime, 'hour')
        console.log(fromStartToEndTimes)
        createArray(fromStartToEndTimes).forEach((_, index) => {
          if (index === 0) {
            return scheduleMap[event.startTime.hour()]?.push({
              ...event,
              isStart: true,
            })
          }
          if (event.startTime.hour() + index >= 24) return
          return scheduleMap[event.startTime.hour() + index]?.push({
            ...event,
            isStart: false,
          })
        })
      })
      console.log(scheduleMap)

      return sortedEvents.map((event) => ({
        ...event,
        top: event.startTime.hour() * HourHeightPx + TimeScheduleClearanceTopPx,
        left: calcScheduleElementLeftPx(scheduleMap, event),
        height:
          event.endTime.hour() * HourHeightPx +
          TimeScheduleClearanceTopPx -
          (event.startTime.hour() * HourHeightPx + TimeScheduleClearanceTopPx) -
          1,
        width: calcScheduleWidth(scheduleMap, event),
      }))
    }

    setEventElementParams(createScheduleItemElementParams())
  }, [events])

  return (
    <div className="relative w-full h-full p-2">
      {Times.map((time) => (
        <div key={time} className="flex h-20 flex pb--5">
          <span className={`w-1/5 ${isNowHour(time) && 'text-accent'}`}>
            {time}
          </span>
          <div
            className={`relative w-4/5 h-full border-t mt-3 ${isNowHour(time) && 'border-accent'}`}
          ></div>
        </div>
      ))}
      {eventElementParams.map((event, index) => (
        <div
          key={index}
          className="absolute flex bg-slate-400"
          style={{
            top: event.top,
            left: event.left,
            height: event.height,
            width: event.width,
          }}
        >
          <div className="absolute w-1 h-full bg-gray-800"></div>
          <div className="px-1">{event.title}</div>
        </div>
      ))}
    </div>
  )
}
