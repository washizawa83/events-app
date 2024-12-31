import dayjs from "dayjs";

export const getMonthDays = (day: dayjs.Dayjs = dayjs()) => {
  const year = day.year();
  const firstDayOfTheMonth = dayjs(new Date(year, day.month(), 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, day.month(), currentMonthCount));
    });
  });
  return daysMatrix;
}