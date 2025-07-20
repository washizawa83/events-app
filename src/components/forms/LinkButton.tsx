import { Button, ButtonVariants } from '@/components/forms/Button'
import Link from 'next/link'

type Props = {
  label: string
  type?: 'button' | 'submit'
  href: string
  handleClick: () => void
} & ButtonVariants

export const LinkButton = ({
  label,
  href,
  handleClick,
  ...variants
}: Props) => {
  return (
    <Link href={href} onClick={handleClick}>
      <Button label={label} {...variants} handleClick={() => {}} />
    </Link>
  )
}
