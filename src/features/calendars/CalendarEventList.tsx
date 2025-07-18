import { Event } from '@prisma/client'
import dayjs from 'dayjs'
import { BsClock, BsGeoAlt } from 'react-icons/bs'

type Props = {
  selectedDayEvents: Event[]
}

export const CalendarEventList = ({ selectedDayEvents }: Props) => {
  return (
    <ul className="flex-1 overflow-y-auto bg-valiantDark">
      {selectedDayEvents.length === 0 && (
        <li className="border-b p-2">
          <p>イベントはありません</p>
        </li>
      )}
      {selectedDayEvents.map((event) => (
        <li key={event.id} className="border-b p-2">
          <h3 key={event.id} className="mb-2 font-bold">
            {event.title}
          </h3>
          <p className="flex items-center gap-2">
            <span>
              <BsClock />
            </span>
            {dayjs(event.startDateTime).format('HH:mm')} 〜{' '}
            {dayjs(event.endDateTime).format('HH:mm')}
          </p>
          <p className="flex items-center gap-2">
            <span>
              <BsGeoAlt />
            </span>
            {event.locationDetail}
          </p>
        </li>
      ))}
    </ul>
  )
}
