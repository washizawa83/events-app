'use client'

import { BsBell, BsCalendar3 } from 'react-icons/bs'
import { NavigationLink } from '../ui/NavigationLink'

export const Header = () => {
  return (
    <header className="hidden sm:flex items-center w-screen h-14 bg-secondary">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-krona">Events</h1>
        </div>
        <ul className="flex items-center">
          <li className="ml-10">
            <NavigationLink
              icon={<BsCalendar3 />}
              label="カレンダー"
              href="/"
            />
          </li>
          <li className="ml-10">
            <NavigationLink icon={<BsBell />} label="通知" href="/" />
          </li>
          <li className="ml-10">
            <div className="w-7 h-7 rounded-full bg-[url('/images/mock-user-icon.jpg')] bg-cover bg-no-repeat"></div>
          </li>
        </ul>
      </div>
    </header>
  )
}
