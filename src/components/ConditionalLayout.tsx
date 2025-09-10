"use client"

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isItalian = pathname.startsWith('/it')
  const isPortuguese = pathname.startsWith('/pt')
  
  // Para rutas de idiomas específicos, solo renderizar children
  // porque ya tienen sus propios layouts con header/footer
  if (isItalian || isPortuguese) {
    return <>{children}</>
  }
  
  // Para rutas en español (default), aplicar header/footer
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
