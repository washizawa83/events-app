'use client'

import { Button } from '@/app/components/forms/Button'
import { SelectButtons } from '@/app/components/forms/SelectButtons'
import { Calendar } from '../calendars/Calendar'
import { Event, EventList } from '../event/EventList'

type Props = {
  events?: Event[]
}

export const UserPageSummary = ({ events }: Props) => {
  return (
    <div className="flex md:flex-row flex-col flex-col-reverse justify-end h-full bg-valiant p-4">
      <div className="md:w-3/5 md:border-r border-secondary">
        <div>
          <SelectButtons
            label=""
            buttonLabels={['指定日の', '全ての', 'あなたの']}
            selected={0}
          />
          <EventList events={events} />
        </div>
      </div>
      <div className="md:w-2/5 mb-5 md:px-4">
        <div className="flex justify-end mb-10">
          <Button label="イベントを追加" size="s" handleClick={() => {}} />
        </div>
        <Calendar handleSelectedDay={() => {}} />
      </div>
    </div>
  )
}
