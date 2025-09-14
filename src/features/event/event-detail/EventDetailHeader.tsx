import { TextHighLight } from '@/components/ui/TextHighLight'
import {
  eventLocationFormatterByOffline,
  eventLocationFormatterByOnline,
} from '@/lib/event'
import { EventWithBasicRelations } from '@/services/event/event.types'
import { EventType } from '@prisma/client'
import dayjs from 'dayjs'
import { BsCalendarWeek, BsClock, BsGeoAlt } from 'react-icons/bs'

type Props = {
  event: EventWithBasicRelations
}

export const EventDetailHeader = ({ event }: Props) => {
  return (
    <div
      className="relative border-b border-gray-200 bg-cover bg-center bg-no-repeat p-4 pb-4"
      style={{
        backgroundImage: `url(${event?.medias[0]?.url})`,
      }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gray-950/60"></div>
      {/* 斜めストライプオーバーレイ */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                rgba(255, 255, 255, 0.15) 3px,
                rgba(255, 255, 255, 0.15) 6px
              )`,
        }}
      ></div>
      <div className="relative z-10">
        <h1 className="mb-6 text-3xl">{event.title}</h1>
        <div>
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
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-4">
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
    </div>
  )
}
