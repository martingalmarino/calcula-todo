import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnalyticsProvider } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Calculadoras Online – Matemáticas Gratis y Paso a Paso',
    template: '%s | Calculadoras Online'
  },
  description: 'Calculadoras matemáticas online: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados, 100% gratis.',
  keywords: [
    'calculadoras online',
    'matemáticas',
    'fracciones',
    'porcentajes',
    'álgebra',
    'trigonometría',
    'derivadas',
    'integrales',
    'matrices',
    'combinatoria',
    'progresiones',
    'logaritmos',
    'gratis',
    'educación'
  ],
  authors: [{ name: 'Calculadoras Online' }],
  creator: 'Calculadoras Online',
  publisher: 'Calculadoras Online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    title: 'Calculadoras Online – Matemáticas Gratis y Paso a Paso',
    description: 'Calculadoras matemáticas online: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados, 100% gratis.',
    siteName: 'Calculadoras Online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras Online – Matemáticas Gratis y Paso a Paso',
    description: 'Calculadoras matemáticas online: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados, 100% gratis.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Calculadoras Online',
              description: 'Calculadoras matemáticas online gratuitas: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados paso a paso.',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com',
              inLanguage: 'es-AR',
              author: {
                '@type': 'Organization',
                name: 'Calculadoras Online',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Calculadoras Online',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}