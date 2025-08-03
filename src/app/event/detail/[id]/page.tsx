import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { getEvent } from '@/services/event/event.service'
import dayjs from 'dayjs'

export const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const event = await getEvent(id)
  if (!event) {
    return <div>イベントが見つかりません</div>
  }

  return (
    <BasePageLayout>
      <div className="h-full w-full p-4">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>{dayjs(event.startDateTime).format('YYYY/MM/DD HH:mm')}</p>
        <p>{dayjs(event.endDateTime).format('YYYY/MM/DD HH:mm')}</p>
        <p>{event.locationDetail}</p>
        <p>{event.onlineLocationDetail}</p>
        <p>{event.eventType}</p>
        <p>{event.eventStatus}</p>
        <p>{event.isPublic}</p>
        <p>{event.conditions}</p>
        <p>{event.maxCapacity}</p>
        <p>{event.overview}</p>
        <p>{event.contact}</p>
      </div>
    </BasePageLayout>
  )
}

export default EventDetailPage
