'use client'

import { Button } from '@/components/forms/Button'
import { Counter } from '@/components/ui/Counter'

type Props = {
  name: string
  id: string
  subscribe: number
  numberOfEvents: number
  description: string
}

export const UserPageSidebar = ({
  name,
  id,
  subscribe,
  numberOfEvents,
  description,
}: Props) => {
  return (
    <div className="h-full bg-primary">
      <div className="bg-valiantDark p-4">
        <div className="mb-3 flex flex-col items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-[url('/images/mock-user-icon.jpg')] bg-cover bg-no-repeat"></div>
          <div>
            <p className="text-sm text-gray-300">id: {id}</p>
            <p className="text-xl">{name}</p>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap items-center justify-around">
          <div className="mb-2">
            <Counter label="Subscribe" count={subscribe} />
          </div>
          <div className="mb-2">
            <Counter label="Events" count={numberOfEvents} />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex items-center justify-center">
          <Button label="編集する" size="s" handleClick={() => {}} />
        </div>
      </div>
    </div>
  )
}
