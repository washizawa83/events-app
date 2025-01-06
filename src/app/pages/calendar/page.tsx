'use client'

import { Button } from '@/app/components/forms/Button'
import { SelectButtons } from '@/app/components/forms/SelectButtons'
import { BasePageLayout } from '@/app/components/layouts/BasePageLayout'
import { Calendar } from '@/app/features/calendars/Calendar'
import { CalendarTimeLine } from '@/app/features/calendars/CalendarTimeLine'
import { useState } from 'react'

enum CalendarScope {
  year,
  month,
  week,
}

const CalendarPage = () => {
  const [calendarScope, setCalendarScope] = useState<CalendarScope>(
    CalendarScope.month,
  )

  const handleSelectedCalendarScope = (selected: number) => {
    setCalendarScope(selected)
  }

  return (
    <BasePageLayout>
      <div className="flex h-[calc(100vh-56px)]">
        <div className="flex flex-col h-full w-[420px] bg-valiantDark">
          <div className="w-full p-2 h-28">
            <Button label="イベントを追加" size="s" handleClick={() => {}} />
          </div>
          <div className="h-full overflow-y-auto">
            <CalendarTimeLine />
          </div>
        </div>
        <div className="flex flex-col h-full flex-grow">
          <div className="flex justify-end bg-primary p-2">
            <SelectButtons
              label=""
              buttonLabels={['年', '月', '週']}
              selected={CalendarScope.month}
              handleSelected={handleSelectedCalendarScope}
            />
          </div>
          {calendarScope === CalendarScope.month && (
            <div className="flex h-full">
              <div className="w-full">
                <Calendar
                  isFullScreen={true}
                  darkMode={true}
                  handleSelectedDay={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </BasePageLayout>
  )
}

export default CalendarPage
