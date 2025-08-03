import { EventWithBasicRelations } from '@/services/event'
import dayjs from 'dayjs'

export const eventLocationFormatterByOffline = (
  event: EventWithBasicRelations,
) => {
  return `${event.prefecture?.name} ${event.city?.name} ${event.locationDetail}`
}

export const eventLocationFormatterByOnline = (
  event: EventWithBasicRelations,
) => {
  return event.onlineLocationDetail
}

export const eventScheduleFormatter = (event: EventWithBasicRelations) => {
  return `${dayjs(event.startDateTime).format('YYYY/MM/DD HH:mm')} 〜 ${dayjs(event.endDateTime).format('YYYY/MM/DD HH:mm')}`
}
