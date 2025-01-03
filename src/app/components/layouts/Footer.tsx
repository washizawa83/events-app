'use client'

import { IconContext } from 'react-icons'
import { BsCalendar3 } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'

export const Footer = () => {
  return (
    <footer className="sm:hidden flex items-center w-screen h-14 bg-secondary">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <ul className="flex items-center justify-around w-full">
          <li>
            <IconContext.Provider value={{ size: '24px' }}>
              <GoHome />
            </IconContext.Provider>
          </li>
          <li className="relative">
            <div className="absolute w-14 h-14 flex items-center justify-center -top-10 -left-7 bg-accent rounded-full">
              <IconContext.Provider value={{ size: '28px' }}>
                <BsCalendar3 />
              </IconContext.Provider>
            </div>
          </li>
          <li>
            <div className="w-7 h-7 rounded-full bg-indigo-500"></div>
          </li>
        </ul>
      </div>
    </footer>
  )
}
