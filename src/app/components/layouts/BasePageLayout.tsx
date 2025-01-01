import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BasePageLayout = ({ children }: Props) => {
  return (
    <main className="w-screen">
      <div className="lg:w-3/4 w-11/12 mx-auto">{children}</div>
    </main>
  )
}
