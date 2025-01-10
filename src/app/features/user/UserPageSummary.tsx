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
    <div className="flex h-full flex-col flex-col-reverse justify-end bg-valiant p-4 md:flex-row">
      <div className="border-secondary md:w-3/5 md:border-r">
        <div>
          <SelectButtons
            label=""
            buttonLabels={['指定日の', '全ての', 'あなたの']}
            selected={0}
            handleSelected={() => {}}
          />
          <EventList events={events} />
        </div>
      </div>
      <div className="mb-5 md:w-2/5 md:px-4">
        <div className="mb-10 flex justify-end">
          <Button label="イベントを追加" size="s" handleClick={() => {}} />
        </div>
        <Calendar handleSelectedDay={() => {}} />
      </div>
    </div>
  )
}
