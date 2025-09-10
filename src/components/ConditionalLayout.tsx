"use client"

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeaderItalian } from '@/components/HeaderItalian'
import { FooterItalian } from '@/components/FooterItalian'
import { HeaderPortuguese } from '@/components/HeaderPortuguese'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isItalian = pathname.startsWith('/it')
  const isPortuguese = pathname.startsWith('/pt')
  
  if (isItalian) {
    return (
      <>
        <HeaderItalian />
        <main className="flex-1">
          {children}
        </main>
        <FooterItalian />
      </>
    )
  }
  
  if (isPortuguese) {
    return (
      <>
        <HeaderPortuguese />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </>
    )
  }
  
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}
