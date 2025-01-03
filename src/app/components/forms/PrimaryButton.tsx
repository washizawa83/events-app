type Props = {
  label: string
  type?: 'button' | 'submit'
  color?: 'success' | 'danger'
  size?: 's' | 'm' | 'l'
  handleClick: () => void
}

const buttonSizeStyle = {
  s: 'px-4 py-1 min-w-20 text-base',
  m: 'px-6 py-2 min-w-32 text-lg',
  l: 'px-8 py-3 min-w-40 text-xl',
}

const backgroundColor = {
  success: 'bg-accent',
  danger: 'bg-valiant',
}

export const PrimaryButton = ({
  label,
  type = 'button',
  size = 'm',
  color = 'success',
  handleClick,
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-baseButton px-2 py-1 rounded-lg outline-none text-white ${buttonSizeStyle[size]} ${backgroundColor[color]} hover:opacity-70 focus:opacity-70`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
