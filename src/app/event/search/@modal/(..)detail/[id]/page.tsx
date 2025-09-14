import { EventDetailModal } from '@/app/event/search/@modal/(..)detail/[id]/modal'
import { EventContents } from '@/features/event/event-detail/EventContents'
import { EventDetailHeader } from '@/features/event/event-detail/EventDetailHeader'
import { getEvent } from '@/services/event'

export const EventDetailModalPage = async ({
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
    <EventDetailModal>
      <div className="h-pageHeight w-full overflow-y-auto text-white">
        <div className="overflow-hidden rounded-md">
          <EventDetailHeader event={event} />
          <EventContents event={event} />
        </div>
      </div>
    </EventDetailModal>
  )
}

export default EventDetailModalPage
