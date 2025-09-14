import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { EventDetailHeader } from '@/features/event/event-detail/EventDetailHeader'
import { EventMedia } from '@/features/event/event-detail/EventMedia'
import { getEvent } from '@/services/event'

export const EventDetailMediasPage = async ({
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
      <div className="h-pageHeight w-full overflow-y-auto p-4">
        <div className="overflow-hidden rounded-md">
          <EventDetailHeader event={event} />
          <EventMedia event={event} />
        </div>
      </div>
    </BasePageLayout>
  )
}

export default EventDetailMediasPage
