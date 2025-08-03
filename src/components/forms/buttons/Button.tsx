import { tv, VariantProps } from 'tailwind-variants'

export type ButtonVariants = VariantProps<typeof button>

export const button = tv({
  base: 'px-4 py-1 min-w-20 text-base rounded',
  variants: {
    size: {
      s: 'px-4 py-1 min-w-20 text-base',
      m: 'px-6 py-2 min-w-32 text-lg',
      l: 'px-8 py-3 min-w-40 text-xl',
    },
    color: {
      success: 'bg-accent hover:bg-accentFocus border-accent',
      variant: 'bg-valiant border-valiant',
    },
    variant: {
      text: 'bg-transparent',
      outlined: 'bg-transparent border',
      contained: '',
    },
  },
  defaultVariants: {
    size: 's',
    color: 'success',
    variant: 'contained',
  },
})

type ButtonProps = {
  label: string
  type?: 'button' | 'submit'
  handleClick: () => void
} & ButtonVariants

export const Button = ({
  label,
  type = 'button',
  handleClick,
  ...variants
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={button({ ...variants })}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
