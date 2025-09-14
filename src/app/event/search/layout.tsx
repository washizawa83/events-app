import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'

export default function EventSearchLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      {modal}
      <div id="modal-root" />
      <Footer />
    </>
  )
}
