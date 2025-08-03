import { EventWithBasicRelations } from '@/services/event'
import { EventListItem } from './EventListItem'

type Props = {
  events?: EventWithBasicRelations[]
}

export const EventList = ({ events }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto bg-valiant">
      <ul className="mx-auto w-11/12 py-5">
        {events ? (
          events.map((event, index) => (
            <EventListItem key={index} event={event} />
          ))
        ) : (
          <div className="text-center">
            <p className="p-10">イベントが見つかりませんでした</p>
          </div>
        )}
      </ul>
    </div>
  )
}
