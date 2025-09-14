import { Button } from '@/components/forms/buttons/Button'
import { LinkButton } from '@/components/forms/buttons/LinkButton'
import { SelectButtons } from '@/components/forms/buttons/SelectButtons'
import { CalendarEventList } from '@/features/calendars/CalendarEventList'
import { CalendarWithSchedule } from '@/features/calendars/CalendarWithSchedule'
import { scheduleTypes } from '@/features/calendars/mediaLayouts/CalendarContentWrap'
import { Event } from '@prisma/client'
import dayjs from 'dayjs'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

type Props = {
  selectedDay: dayjs.Dayjs
  selectedDate: dayjs.Dayjs
  selectedMonth: string
  displayScheduleType: (typeof scheduleTypes)[number]
  selectedDayEvents: Event[]
  handleSelectDay: (day: dayjs.Dayjs) => void
  calendarDates: dayjs.Dayjs[]
  scheduleMap: Record<string, Event[]>
}

export const MobileCalendar = ({
  selectedDay,
  selectedDate,
  selectedMonth,
  displayScheduleType,
  selectedDayEvents,
  handleSelectDay,
  calendarDates,
  scheduleMap,
}: Props) => {
  const [isOpenSchedule, setIsOpenSchedule] = useState(false)

  const handleSelectDayAndOpenSchedule = (day: dayjs.Dayjs) => {
    handleSelectDay(day)
    setIsOpenSchedule(true)
  }

  return (
    <div>
      {isOpenSchedule ? (
        <div className="h-pageHeight flex-grow">
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center bg-primary p-2">
              <IoIosArrowBack />
              <Button
                label={selectedDate.format('YYYY年MM月')}
                size="s"
                variant="text"
                handleClick={() => setIsOpenSchedule(false)}
              />
            </div>
            <div className="flex h-12 justify-between bg-primary p-2 md:h-16">
              <div>
                <LinkButton
                  label="イベントを追加"
                  href="/event/create"
                  size="s"
                />
              </div>
              <div>
                <SelectButtons
                  label=""
                  buttonLabels={['イベントリスト', 'タイムライン']}
                  selected={0}
                  handleSelected={(selected) => {}}
                />
              </div>
            </div>
            {displayScheduleType === 'LIST' && (
              <CalendarEventList selectedDayEvents={selectedDayEvents} />
            )}
          </div>
        </div>
      ) : (
        <div className="h-pageHeight flex-grow">
          <CalendarWithSchedule
            isFullScreen={true}
            darkMode={true}
            handleSelectedDay={handleSelectDayAndOpenSchedule}
            selectedDay={selectedDay}
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            calendarDates={calendarDates}
            scheduleMap={scheduleMap}
          />
        </div>
      )}
    </div>
  )
}
