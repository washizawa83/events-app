import { Button, ButtonVariants } from '@/components/forms/buttons/Button'
import Link from 'next/link'

type Props = {
  label: string
  type?: 'button' | 'submit'
  href: string
} & ButtonVariants

export const LinkButton = ({ label, href, ...variants }: Props) => {
  return (
    <Link href={href}>
      <Button label={label} {...variants} />
    </Link>
  )
}
