import { NavigationLink } from '@/components/ui/NavigationLink'
import { getUserProfile } from '@/services/user/user'
import { BsCalendar3, BsUnlock } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { UserIconButton } from '../ui/UserIconButton'

export const Footer = async () => {
  const userProfile = await getUserProfile()

  return (
    <footer className="fixed bottom-0 flex h-14 w-screen items-center bg-secondary sm:hidden">
      <div className="mx-auto flex w-11/12 items-center justify-between">
        <ul className="flex w-full items-center justify-around">
          <li>
            <NavigationLink icon={<GoHome />} href="/search" iconSize="24px" />
          </li>
          <li className="relative">
            <div className="absolute -left-7 -top-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <NavigationLink
                icon={<BsCalendar3 />}
                href="/calendar"
                iconSize="28px"
              />
            </div>
          </li>
          <li>
            {userProfile ? (
              <UserIconButton
                userIcon={userProfile.imageUrl}
                menuLocation="top"
              />
            ) : (
              <NavigationLink
                icon={<BsUnlock />}
                href="/login"
                iconSize="24px"
              />
            )}
          </li>
        </ul>
      </div>
    </footer>
  )
}
