import Link from 'next/link'
import { ReactNode } from 'react'
import { IconContext } from 'react-icons'

type Props = {
  icon?: ReactNode
  label?: string
  href: string
}

export const NavigationLink = ({ icon, label, href }: Props) => {
  return (
    <Link href={href} className="flex items-center">
      <span className="mr-2">
        <IconContext.Provider value={{ size: '18px' }}>
          {icon}
        </IconContext.Provider>
      </span>
      {label}
    </Link>
  )
}
