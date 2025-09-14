import { TextHighLight } from '@/components/ui/TextHighLight'
import { Tip } from '@/components/ui/Tip'
import {
  eventLocationFormatterByOffline,
  eventLocationFormatterByOnline,
} from '@/lib/event'
import { EventWithBasicRelations } from '@/services/event'
import { EventType } from '@prisma/client'
import dayjs from 'dayjs'
import Link from 'next/link'
import { BsCalendarWeek, BsClock, BsGeoAlt } from 'react-icons/bs'
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
        <p className="mb-2 line-clamp-2 text-gray-200">{event.description}</p>
        <div className="mb-2 flex items-start">
          <span className="mr-3">
            <SlTag />
          </span>
          <ul className="flex flex-wrap items-center">
            {event.tags?.map((tag, index) => (
              <li key={index} className={`mb-2 mr-2 ${index > 5 && 'hidden'}`}>
                <Tip label={tag.name} />
              </li>
            ))}
            {event.tags?.length > 5 && <li className="mb-2 mr-2">...</li>}
          </ul>
        </div>
      </div>
      <div className="min-w-40 basis-full xl:basis-1/3">
        <div className="mb-2 flex items-center gap-2">
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
        <div className="mb-2 flex flex-wrap items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2">
            <span>
              <BsCalendarWeek />
            </span>
            <div className="flex flex-wrap items-center">
              <TextHighLight
                text={dayjs(event.startDateTime).format('YYYY/MM/DD')}
              />
              {event.startDateTime !== event.endDateTime && (
                <>
                  <span className="mx-1">〜</span>
                  <TextHighLight
                    text={dayjs(event.endDateTime).format('YYYY/MM/DD')}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <BsClock />
            </span>
            <div className="flex flex-wrap items-center">
              <TextHighLight
                text={dayjs(event.startDateTime).format('HH:mm')}
              />
              {event.startDateTime !== event.endDateTime && (
                <>
                  <span className="mx-1">〜</span>
                  <TextHighLight
                    text={dayjs(event.endDateTime).format('HH:mm')}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
