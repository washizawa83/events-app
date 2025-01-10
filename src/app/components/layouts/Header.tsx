'use client'

import Link from 'next/link'
import { BsBell, BsCalendar3 } from 'react-icons/bs'
import { NavigationLink } from '../ui/NavigationLink'
import { UserIconButton } from '../ui/UserIconButton'

export const Header = () => {
  return (
    <header className="hidden h-14 w-screen items-center bg-secondary sm:flex">
      <div className="mx-auto flex w-11/12 items-center justify-between">
        <div>
          <h1 className="font-krona">
            <Link href="/pages/search">Events</Link>
          </h1>
        </div>
        <ul className="flex items-center">
          <li className="ml-10">
            <NavigationLink
              icon={<BsCalendar3 />}
              label="カレンダー"
              href="/pages/calendar"
            />
          </li>
          <li className="ml-10">
            <NavigationLink icon={<BsBell />} label="通知" href="/" />
          </li>
          <li className="ml-10">
            <UserIconButton
              userIcon="/images/mock-user-icon.jpg"
              menuLocation="bottom"
            />
          </li>
        </ul>
      </div>
    </header>
  )
}
