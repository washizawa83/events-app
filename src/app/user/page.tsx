'use client'

import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { UserPageSidebar } from '@/features/user/UserPageSidebar'
import { UserPageSummary } from '@/features/user/UserPageSummary'
import { loginUserAtom } from '@/services/jotai/loginUserAtom'
import { useAtom } from 'jotai'
import { redirect } from 'next/navigation'

const mockUser = {
  name: 'Tom Anderson',
  id: 'nde-89h-3uf-39',
  subscribe: 3230,
  numberOfEvents: 22,
  description:
    'I\`m Tom Anderson, a singer-songwriter performing primarily across North America. I also share my work on YouTube and Instagram, so I\`d be delighted if you could check those out as well.',
  events: [
    {
      title: 'The First Stage 2025',
      description:
        'This is the first show of 2025 and we will be performing 3 songs.',
      address: '東京都千代田区丸の内1-1',
      schedule: '10:00 ~ 15:00',
      tags: ['Live'],
    },
  ],
}

const UserPage = () => {
  const [loginUser] = useAtom(loginUserAtom)

  if (!loginUser) {
    return redirect('/login')
  }

  return (
    <BasePageLayout>
      <div className="h-pageHeight flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4">
          <UserPageSidebar
            name={mockUser.name}
            id={mockUser.id}
            subscribe={mockUser.subscribe}
            numberOfEvents={mockUser.numberOfEvents}
            description={mockUser.description}
          />
        </div>
        <div className="w-full flex-1 lg:w-3/4">
          <UserPageSummary events={mockUser.events} />
        </div>
      </div>
    </BasePageLayout>
  )
}

export default UserPage
