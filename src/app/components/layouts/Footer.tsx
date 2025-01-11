'use client'

import Link from 'next/link'
import { IconContext } from 'react-icons'
import { BsCalendar3 } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { UserIconButton } from '../ui/UserIconButton'

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex h-14 w-screen items-center bg-secondary sm:hidden">
      <div className="mx-auto flex w-11/12 items-center justify-between">
        <ul className="flex w-full items-center justify-around">
          <li>
            <Link href={'/pages/search'}>
              <IconContext.Provider value={{ size: '24px' }}>
                <GoHome />
              </IconContext.Provider>
            </Link>
          </li>
          <li className="relative">
            <div className="absolute -left-7 -top-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Link href={'/pages/calendar'}>
                <IconContext.Provider value={{ size: '28px' }}>
                  <BsCalendar3 />
                </IconContext.Provider>
              </Link>
            </div>
          </li>
          <li>
            {/* <div className="w-7 h-7 rounded-full bg-[url('/images/mock-user-icon.jpg')] bg-cover bg-no-repeat"></div> */}
            <UserIconButton
              userIcon="/images/mock-user-icon.jpg"
              menuLocation="top"
            />
          </li>
        </ul>
      </div>
    </footer>
  )
}
