import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

export const getMonthDays = (day: dayjs.Dayjs = dayjs()) => {
  const year = day.year()
  const firstDayOfTheMonth = dayjs(new Date(year, day.month(), 1)).day()
  let currentMonthCount = 0 - firstDayOfTheMonth
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, day.month(), currentMonthCount))
    })
  })
  return daysMatrix
}

dayjs.extend(isoWeek)

export const getCalendarStartDate = (year: number, month: number) => {
  const startOfMonth = dayjs(`${year}-${month}-01`)
  const calendarStart = startOfMonth.startOf('isoWeek')
  return calendarStart
}

export const getCalendarEndDate = (year: number, month: number) => {
  const startOfMonth = dayjs(`${year}-${month}-01`)
  const endOfMonth = startOfMonth.endOf('month')
  const calendarEnd = endOfMonth.endOf('isoWeek')
  return calendarEnd
}

export const getCalendarDates = (
  year: number,
  month: number,
): dayjs.Dayjs[] => {
  const calendarStart = getCalendarStartDate(year, month)
  const calendarEnd = getCalendarEndDate(year, month)

  const dates: dayjs.Dayjs[] = []
  let current = calendarStart

  while (current.isBefore(calendarEnd) || current.isSame(calendarEnd, 'day')) {
    dates.push(current)
    current = current.add(1, 'day')
  }

  return dates
}
