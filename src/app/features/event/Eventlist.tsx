import { EventListItem } from './EventListItem'

export type Event = {
  title: string
  description: string
  address: string
  schedule: string
  tags: string[]
}

type Props = {
  events?: Event[]
}

export const EventList = ({ events }: Props) => {
  return (
    <div className="bg-valiant flex-1 overflow-y-auto">
      <ul className="w-11/12 mx-auto py-5">
        {events ? (
          events.map((event, index) => (
            <EventListItem
              key={index}
              title={event.title}
              description={event.description}
              address={event.address}
              schedule={event.schedule}
              tags={event.tags}
            />
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
