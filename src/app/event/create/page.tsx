import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { EventCreateForm } from '@/features/event/EventCreateForm'
import { getCities, getPrefectures } from '@/services/location/cruds/read'

const EventCreatePage = async () => {
  const prefectures = await getPrefectures()
  const cities = await getCities()

  return (
    <BasePageLayout>
      <div className="h-pageHeight w-full overflow-y-auto">
        <EventCreateForm prefectures={prefectures} cities={cities} />
      </div>
    </BasePageLayout>
  )
}

export default EventCreatePage
