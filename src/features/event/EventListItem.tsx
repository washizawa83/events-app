import { Tip } from '@/components/ui/Tip'
import { SlTag } from 'react-icons/sl'

type Props = {
  title: string
  description: string
  address: string
  schedule: string
  tags?: string[]
}

export const EventListItem = ({
  title,
  description,
  address,
  schedule,
  tags,
}: Props) => {
  return (
    <li className="mb-3 block flex-wrap border-b border-secondary py-3 sm:flex">
      <div className="basis-full xl:basis-2/3">
        <h2 className="mb-2 text-xl">{title}</h2>
        <p className="mb-2 text-gray-300">{description}</p>
        <div className="flex items-center">
          <span className="mr-3">
            <SlTag />
          </span>
          <ul className="flex flex-wrap items-center">
            {tags?.map((tag) => (
              <li key={tag} className="mb-2 mr-2">
                <Tip label={tag} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="min-w-40 basis-full xl:basis-1/3">
        <div className="flex h-10 items-center">
          <p>場所：{address}</p>
        </div>
        <div className="flex h-10 items-center">
          <p>日程：{schedule}</p>
        </div>
      </div>
    </li>
  )
}
