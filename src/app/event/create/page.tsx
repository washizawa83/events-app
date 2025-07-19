import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { EventCreateForm } from '@/features/event/EventCreateForm'

const EventCreatePage = () => {
  return (
    <BasePageLayout>
      <div className="h-pageHeight w-full overflow-y-auto">
        <EventCreateForm />
      </div>
    </BasePageLayout>
  )
}

export default EventCreatePage
