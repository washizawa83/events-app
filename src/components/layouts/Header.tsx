'use client'

import { apiRequest } from '@/services/api/api-service'
import { getAccessToken } from '@/services/auth/auth-service'
import { loginUserAtom } from '@/services/jotai/loginUserAtom'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect } from 'react'
import { BsBell, BsCalendar3, BsPerson } from 'react-icons/bs'
import { NavigationLink } from '../ui/NavigationLink'
import { UserIconButton } from '../ui/UserIconButton'

export const Header = () => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom)

  useEffect(() => {
    const fetchLoginUser = async () => {
      const accessToken = getAccessToken()
      if (!accessToken) return

      const userResponse = await apiRequest('/users/me', 'GET', {}, true)
      setLoginUser(userResponse.data)
    }
    fetchLoginUser()
  }, [])

  return (
    <header className="hidden h-14 w-screen items-center bg-secondary sm:flex">
      <div className="mx-auto flex w-11/12 items-center justify-between 2xl:w-[1280px]">
        <div>
          <h1 className="font-krona">
            <Link href="/search">Events</Link>
          </h1>
        </div>
        <ul className="flex items-center">
          <li className="ml-10">
            <NavigationLink
              icon={<BsCalendar3 />}
              label="カレンダー"
              href="/calendar"
            />
          </li>
          <li className="ml-10">
            <NavigationLink icon={<BsBell />} label="通知" href="/" />
          </li>
          <li className="ml-10">
            {loginUser ? (
              <UserIconButton
                userIcon="/images/mock-user-icon.jpg"
                menuLocation="bottom"
              />
            ) : (
              <NavigationLink
                icon={<BsPerson />}
                label="ログイン"
                href="/login"
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}
