import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { HeaderPortuguese } from '@/components/HeaderPortuguese'
import { FooterPortuguese } from '@/components/FooterPortuguese'
import { AnalyticsProvider } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CalculaTudo.online – Matemática Gratuita e Passo a Passo',
    template: '%s | CalculaTudo.online'
  },
  description: 'Calculadoras matemáticas online: frações, percentuais, álgebra, trigonometria e mais. Resultados rápidos e explicados, 100% grátis.',
  keywords: [
    'calculadoras online',
    'matemática',
    'frações',
    'percentuais',
    'álgebra',
    'trigonometria',
    'derivadas',
    'integrais',
    'matrizes',
    'combinatória',
    'progressões',
    'logaritmos',
    'grátis',
    'educação'
  ],
  authors: [{ name: 'CalculaTudo.online' }],
  creator: 'CalculaTudo.online',
  publisher: 'CalculaTudo.online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online'),
  alternates: {
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/pt',
    title: 'CalculaTudo.online – Matemática Gratuita e Passo a Passo',
    description: 'Calculadoras matemáticas online: frações, percentuais, álgebra, trigonometria e mais. Resultados rápidos e explicados, 100% grátis.',
    siteName: 'CalculaTudo.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculaTudo.online – Matemática Gratuita e Passo a Passo',
    description: 'Calculadoras matemáticas online: frações, percentuais, álgebra, trigonometria e mais. Resultados rápidos e explicados, 100% grátis.',
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

export default function PortugueseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="u-MVoJHGUNMJadZ7ojXLQK1ELhcuh2gEU3eWmAJTNmE" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CalculaTudo.online',
              description: 'Calculadoras matemáticas online gratuitas: frações, percentuais, álgebra, trigonometria e mais. Resultados rápidos e explicados passo a passo.',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online',
              inLanguage: 'pt-BR',
              author: {
                '@type': 'Organization',
                name: 'CalculaTudo.online',
              },
              publisher: {
                '@type': 'Organization',
                name: 'CalculaTudo.online',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <div className="min-h-screen flex flex-col">
            <HeaderPortuguese />
            <main className="flex-1">
              {children}
            </main>
            <FooterPortuguese />
          </div>
        </AnalyticsProvider>
        {/* Lucide Icons CDN */}
        <Script
          src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"
          strategy="afterInteractive"
        />
        {/* Activar iconos de Lucide */}
        <Script
          id="lucide-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                if (typeof lucide !== 'undefined') {
                  lucide.createIcons();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
