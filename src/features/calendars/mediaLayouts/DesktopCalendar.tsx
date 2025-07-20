import { LinkButton } from '@/components/forms/LinkButton'
import { SelectButtons } from '@/components/forms/SelectButtons'
import { CalendarEventList } from '@/features/calendars/CalendarEventList'
import { CalendarWithSchedule } from '@/features/calendars/CalendarWithSchedule'
import { scheduleTypes } from '@/features/calendars/mediaLayouts/CalendarContentWrap'
import { Event } from '@prisma/client'
import dayjs from 'dayjs'

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

export const DesktopCalendar = ({
  selectedDay,
  selectedDate,
  selectedMonth,
  displayScheduleType,
  selectedDayEvents,
  handleSelectDay,
  calendarDates,
  scheduleMap,
}: Props) => {
  return (
    <div className="flex">
      <div className="h-pageHeight w-96 shrink-0 flex-col">
        <div className="flex h-full w-full flex-col">
          <div className="flex h-12 justify-between bg-primary p-2 md:h-16">
            <div>
              <LinkButton
                label="イベントを追加"
                href="/event/create"
                size="s"
                handleClick={() => {}}
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
      <div className="h-pageHeight flex-grow">
        <CalendarWithSchedule
          isFullScreen={true}
          darkMode={true}
          handleSelectedDay={handleSelectDay}
          selectedDay={selectedDay}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          calendarDates={calendarDates}
          scheduleMap={scheduleMap}
        />
      </div>
    </div>
  )
}
