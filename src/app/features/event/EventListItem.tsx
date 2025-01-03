import { Tip } from '@/app/components/ui/Tip'
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
    <li className="sm:flex py-3 mb-3 border-b block">
      <div className="basis-2/3">
        <h2 className="text-xl mb-2">{title}</h2>
        <p className="text-gray-300 mb-2">{description}</p>
        <div className="flex items-center">
          <span className="mr-3">
            <SlTag />
          </span>
          <ul className="flex items-center flex-wrap">
            {tags?.map((tag) => (
              <li key={tag} className="mr-2 mb-2">
                <Tip label={tag} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="basis-1/3">
        <div className="flex items-center h-10">
          <p>場所：{address}</p>
        </div>
        <div className="flex items-center h-10">
          <p>日程：{schedule}</p>
        </div>
      </div>
    </li>
  )
}
