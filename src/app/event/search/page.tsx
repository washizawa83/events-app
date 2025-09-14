import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { EventList } from '@/features/event/EventList'
import { EventSearchBox } from '@/features/event/EventSearchBox'
import { getEvents } from '@/services/event/event.service'

const EventSearchPage = async () => {
  const events = await getEvents()

  return (
    <BasePageLayout>
      <div className="flex h-pageHeight flex-col">
        <EventSearchBox />
        <EventList events={events} />
      </div>
    </BasePageLayout>
  )
}

export default EventSearchPage
