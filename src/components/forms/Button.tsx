import { tv, VariantProps } from 'tailwind-variants'

type ButtonVariants = VariantProps<typeof button>

export const button = tv({
  base: 'px-4 py-1 min-w-20 text-base rounded',
  variants: {
    size: {
      s: 'px-4 py-1 min-w-20 text-base',
      m: 'px-6 py-2 min-w-32 text-lg',
      l: 'px-8 py-3 min-w-40 text-xl',
    },
    color: {
      success: 'bg-accent hover:bg-accentFocus focus:bg-accentFocus',
      variant: 'bg-valiant',
    },
  },
  defaultVariants: {
    size: 's',
    color: 'success',
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
