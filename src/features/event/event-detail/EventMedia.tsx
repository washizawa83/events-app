import { SelectLinkButtons } from '@/components/forms/buttons/SelectLinkButtons'
import { EventWithBasicRelations } from '@/services/event/event.types'
type Props = {
  event: EventWithBasicRelations
}

export const EventMedia = ({ event }: Props) => {
  return (
    <div className="bg-valiantDark p-4">
      <div className="mb-4 flex justify-end">
        <SelectLinkButtons
          label=""
          buttonLabels={['イベント内容', 'イメージ']}
          selected={1}
          hrefs={[
            `/event/detail/${event.id}`,
            `/event/detail/${event.id}/medias`,
          ]}
        />
      </div>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {event.medias.map((media) => (
          <li key={media.id}>
            <div
              style={{
                backgroundImage: `url(${media.url})`,
              }}
              className="aspect-3/2 rounded-md bg-cover bg-center bg-no-repeat"
            ></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
