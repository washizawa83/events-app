'use client'

import Link from 'next/link'
import { IconContext } from 'react-icons'
import { BsCalendar3 } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { UserIconButton } from '../ui/UserIconButton'

export const Footer = () => {
  return (
    <footer className="sm:hidden fixed bottom-0 flex items-center w-screen h-14 bg-secondary">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <ul className="flex items-center justify-around w-full">
          <li>
            <Link href={'/pages/search'}>
              <IconContext.Provider value={{ size: '24px' }}>
                <GoHome />
              </IconContext.Provider>
            </Link>
          </li>
          <li className="relative">
            <div className="absolute w-14 h-14 flex items-center justify-center -top-10 -left-7 bg-accent rounded-full">
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
