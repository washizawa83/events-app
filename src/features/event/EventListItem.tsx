import { Tip } from '@/components/ui/Tip'
import {
  eventLocationFormatterByOffline,
  eventLocationFormatterByOnline,
  eventScheduleFormatter,
} from '@/lib/event'
import { EventWithBasicRelations } from '@/services/event'
import { EventType } from '@prisma/client'
import Link from 'next/link'
import { BsClock, BsGeoAlt } from 'react-icons/bs'
import { SlTag } from 'react-icons/sl'

type Props = {
  event: EventWithBasicRelations
}

export const EventListItem = ({ event }: Props) => {
  return (
    <li className="mb-3 block flex-wrap border-b border-secondary py-3 sm:flex">
      <div className="basis-full xl:basis-2/3">
        <h2 className="mb-2 text-xl">
          <Link href={`/event/detail/${event.id}`}>{event.title}</Link>
        </h2>
        <p className="mb-2 text-gray-300">{event.description}</p>
        <div className="mb-2 flex items-center">
          <span className="mr-3">
            <SlTag />
          </span>
          <ul className="flex flex-wrap items-center">
            {event.tags?.map((tag, index) => (
              <li key={index} className="mb-2 mr-2">
                <Tip label={tag.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="min-w-40 basis-full xl:basis-1/3">
        <div className="flex h-10 items-center gap-2">
          <span>
            <BsGeoAlt />
          </span>
          <div>
            {(event.eventType === EventType.OFFLINE ||
              event.eventType === EventType.HYBRID) && (
              <p>{eventLocationFormatterByOffline(event)}</p>
            )}
            {(event.eventType === EventType.ONLINE ||
              event.eventType === EventType.HYBRID) && (
              <p>{eventLocationFormatterByOnline(event)}</p>
            )}
          </div>
        </div>
        <div className="flex h-10 items-center gap-2">
          <span>
            <BsClock />
          </span>
          <p>{eventScheduleFormatter(event)}</p>
        </div>
      </div>
    </li>
  )
}
