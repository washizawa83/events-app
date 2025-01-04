'use client'

import Link from 'next/link'
import { useState } from 'react'

type Props = {
  userIcon: string
  menuLocation: 'top' | 'bottom'
}

export const UserIconButton = ({ userIcon, menuLocation }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <div className="relative">
      <button
        style={{ backgroundImage: `url('${userIcon}')` }}
        className={`w-7 h-7 rounded-full bg-cover bg-no-repeat`}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      ></button>
      {isOpenMenu && (
        <div
          className={`absolute rounded-xl w-32 bg-white overflow-hidden py-2 ${menuLocation === 'top' ? '-top-28 -left-10' : 'top-8 -left-20'}`}
        >
          <ul className="text-gray-800">
            <Link
              href={'/pages/user'}
              className="text-sm block mb-2 hover:bg-gray-300 p-2"
              onClick={() => setIsOpenMenu(false)}
            >
              マイページ
            </Link>
            <Link
              href={'/pages/user'}
              className="text-sm block hover:bg-gray-300 p-2"
              onClick={() => setIsOpenMenu(false)}
            >
              ログアウト
            </Link>
          </ul>
        </div>
      )}
    </div>
  )
}
