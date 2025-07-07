import { signIn } from '@/auth'

type Pros = {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export const AuthIconButton = ({ icon, label, onClick }: Pros) => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <button
        className="flex h-12 w-64 items-center justify-center rounded-full bg-white md:w-96"
        type="submit"
      >
        <span className="mr-3">{icon}</span>
        <span className="text-xl font-bold text-primary">{label}</span>
      </button>
    </form>
  )
}
