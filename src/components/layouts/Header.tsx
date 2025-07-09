import { getUserProfile } from '@/services/user/user'
import Link from 'next/link'
import { BsBell, BsCalendar3, BsUnlock } from 'react-icons/bs'
import { NavigationLink } from '../ui/NavigationLink'
import { UserIconButton } from '../ui/UserIconButton'

export const Header = async () => {
  const userProfile = await getUserProfile()

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
          {userProfile ? (
            <>
              <li className="ml-10">
                <NavigationLink icon={<BsBell />} label="通知" href="/" />
              </li>
              <li className="ml-10">
                <UserIconButton
                  userIcon={userProfile.imageUrl}
                  menuLocation="bottom"
                />
              </li>
            </>
          ) : (
            <li className="ml-10">
              <NavigationLink
                icon={<BsUnlock />}
                label="ログイン"
                href="/login"
              />
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
