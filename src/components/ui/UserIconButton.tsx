'use client'

import { useClickOutside } from '@/hooks/useClickOutside'
import { logoutUser } from '@/lib/auth'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  userIcon: string
  menuLocation: 'top' | 'bottom'
}

export const UserIconButton = ({ userIcon, menuLocation }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const contentRef = useClickOutside<HTMLDivElement>(() => setIsOpenMenu(false))

  return (
    <div className="relative" ref={contentRef}>
      <button
        style={{ backgroundImage: `url('${userIcon}')` }}
        className={`h-7 w-7 rounded-full bg-cover bg-no-repeat`}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      ></button>
      {isOpenMenu && (
        <div
          className={`absolute z-40 w-32 overflow-hidden rounded-xl bg-white py-2 ${menuLocation === 'top' ? '-left-10 -top-28' : '-left-20 top-8'}`}
        >
          <ul className="text-gray-800">
            <Link
              href={'/user'}
              className="mb-2 block p-2 text-sm hover:bg-gray-300"
              onClick={() => setIsOpenMenu(false)}
            >
              マイページ
            </Link>
            <form action={logoutUser}>
              <button
                type="submit"
                className="block w-full p-2 text-left text-sm hover:bg-gray-300"
              >
                ログアウト
              </button>
            </form>
          </ul>
        </div>
      )}
    </div>
  )
}
