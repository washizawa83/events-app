'use client'

import { Button } from '@/app/components/forms/Button'
import { SelectButtons } from '@/app/components/forms/SelectButtons'
import { BasePageLayout } from '@/app/components/layouts/BasePageLayout'
import { Calendar } from '@/app/features/calendars/Calendar'
import { CalendarTimeSchedule } from '@/app/features/calendars/CalendarTimeSchedule'
import dayjs from 'dayjs'
import { useState } from 'react'

enum CalendarScope {
  year,
  month,
  week,
}

const events = [
  {
    id: '00',
    title: 'オールナイトイベント',
    startTime: dayjs().add(-1, 'day').hour(22).minute(0),
    endTime: dayjs().hour(6).minute(0),
  },
  {
    id: '01',
    title: '沖縄ご当地フェア in 長野',
    startTime: dayjs().hour(9).minute(15),
    endTime: dayjs().hour(11).minute(30),
  },
  {
    id: '02',
    title: '京都ご当地フェア in 長野',
    startTime: dayjs().hour(12).minute(0),
    endTime: dayjs().hour(13).minute(30),
  },
  {
    id: '03',
    title: 'MHW ゲーム配信',
    startTime: dayjs().hour(18).minute(0),
    endTime: dayjs().hour(20).minute(0),
  },
  {
    id: '04',
    title: '歯医者',
    startTime: dayjs().hour(18).minute(0),
    endTime: dayjs().hour(18).minute(30),
  },
  {
    id: '05',
    title: 'ハウスダーツ大会',
    startTime: dayjs().hour(22).minute(0),
    endTime: dayjs().hour(24).minute(0),
  },
  {
    id: '06',
    title: 'マイクラ ゲーム配信',
    startTime: dayjs().hour(20).minute(0),
    endTime: dayjs().add(1, 'day').hour(2).minute(30),
  },
]

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
            <CalendarTimeSchedule events={events} timeScheduleWidth={400} />
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
