import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BasePageLayout = ({ children }: Props) => {
  return (
    <main className="w-screen">
      <div className="2xl:w-[1280px] w-full mx-auto">{children}</div>
    </main>
  )
}
