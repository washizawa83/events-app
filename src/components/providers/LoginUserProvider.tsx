'use client'

import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'
import { Provider } from 'jotai'

export const LoginUserProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Provider>
        <Header />
        {children}
        <Footer />
      </Provider>
    </>
  )
}
