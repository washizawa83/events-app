import { EventWithBasicRelations } from '@/services/event'

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
