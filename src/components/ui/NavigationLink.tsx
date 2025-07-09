'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { IconContext } from 'react-icons'

type Props = {
  icon?: ReactNode
  label?: string
  href: string
  iconSize?: string
}

export const NavigationLink = ({
  icon,
  label,
  href,
  iconSize = '18px',
}: Props) => {
  return (
    <Link href={href} className="flex items-center">
      <span className={`${label ? 'mr-2' : ''}`}>
        <IconContext.Provider value={{ size: iconSize }}>
          {icon}
        </IconContext.Provider>
      </span>
      {label}
    </Link>
  )
}
