"use client"

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeaderItalian } from '@/components/HeaderItalian'
import { FooterItalian } from '@/components/FooterItalian'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isItalian = pathname.startsWith('/it')
  
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
