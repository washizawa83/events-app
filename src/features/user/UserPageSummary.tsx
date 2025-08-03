'use client'

import { LinkButton } from '@/components/forms/buttons/LinkButton'
import { SelectButtons } from '@/components/forms/buttons/SelectButtons'
import { EventWithBasicRelations } from '@/services/event'
import { Calendar } from '../calendars/Calendar'
import { EventList } from '../event/EventList'

type Props = {
  events?: EventWithBasicRelations[]
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
          <LinkButton
            label="イベントを追加"
            href="/event/create"
            size="s"
            handleClick={() => {}}
          />
        </div>
        <Calendar handleSelectedDay={() => {}} />
      </div>
    </div>
  )
}
