import { IconContext } from 'react-icons'

type Pros = {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export const AuthIconButton = ({ icon, label, onClick }: Pros) => {
  return (
    <button
      className="flex h-12 w-64 items-center justify-center rounded-full bg-white md:w-96"
      onClick={onClick}
    >
      <span className="mr-3">
        <IconContext.Provider value={{ size: '22px' }}>
          {icon}
        </IconContext.Provider>
      </span>
      <span className="text-xl font-bold text-primary">{label}</span>
    </button>
  )
}
