import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
