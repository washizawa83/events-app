import { SelectLinkButtons } from '@/components/forms/buttons/SelectLinkButtons'
import { EventWithBasicRelations } from '@/services/event/event.types'

type Props = {
  event: EventWithBasicRelations
}

export const EventContents = ({ event }: Props) => {
  return (
    <div className="bg-valiantDark p-4">
      <div className="mb-4 flex justify-end">
        <SelectLinkButtons
          label=""
          buttonLabels={['イベント内容', 'イメージ']}
          selected={0}
          hrefs={[
            `/event/detail/${event.id}`,
            `/event/detail/${event.id}/medias`,
          ]}
        />
      </div>
      <div>
        <h2 className="mb-2 text-lg font-bold">イベント概要</h2>
        <p className="mb-6 whitespace-pre-line border-b pb-6">
          {event.description}
        </p>
        <h2 className="mb-2 text-lg font-bold">参加条件</h2>
        <p className="mb-6 whitespace-pre-line border-b pb-6">
          {event.conditions}
        </p>
        <h2 className="mb-2 text-lg font-bold">参加可能人数</h2>
        <p className="mb-6 whitespace-pre-line border-b pb-6">
          {event.maxCapacity}
        </p>
        <h2 className="mb-2 text-lg font-bold">その他</h2>
        <p className="mb-6 whitespace-pre-line border-b pb-6">
          {event.overview}
        </p>
        <h2 className="mb-2 text-lg font-bold">お問い合わせ</h2>
        <p className="mb-6 whitespace-pre-line border-b pb-6">
          {event.contact}
        </p>
      </div>
    </div>
  )
}
