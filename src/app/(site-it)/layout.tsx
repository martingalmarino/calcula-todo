import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnalyticsProvider } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CalculaTutto.online – Calcolatrici Online Gratuite',
    template: '%s | CalculaTutto.online'
  },
  description: 'Calcolatrici online gratuite per matematica, finanza, salute e molto altro. Risultati rapidi e spiegati passo dopo passo.',
  keywords: [
    'calcolatrici online',
    'matematica',
    'frazioni',
    'percentuali',
    'algebra',
    'trigonometria',
    'derivate',
    'integrali',
    'matrici',
    'combinatoria',
    'progressioni',
    'logaritmi',
    'gratis',
    'educazione'
  ],
  authors: [{ name: 'CalculaTutto.online' }],
  creator: 'CalculaTutto.online',
  publisher: 'CalculaTutto.online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online'),
  alternates: {
    languages: {
      'es': '/',
      'it': '/it',
    },
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
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: '/it',
    title: 'CalculaTutto.online – Calcolatrici Online Gratuite',
    description: 'Calcolatrici online gratuite per matematica, finanza, salute e molto altro. Risultati rapidi e spiegati passo dopo passo.',
    siteName: 'CalculaTutto.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculaTutto.online – Calcolatrici Online Gratuite',
    description: 'Calcolatrici online gratuite per matematica, finanza, salute e molto altro. Risultati rapidi e spiegati passo dopo passo.',
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

export default function ItalianLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it-IT" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="u-MVoJHGUNMJadZ7ojXLQK1ELhcuh2gEU3eWmAJTNmE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CalculaTutto.online',
              description: 'Calcolatrici online gratuite per matematica, finanza, salute e molto altro. Risultati rapidi e spiegati passo dopo passo.',
              url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/it',
              inLanguage: 'it-IT',
              author: {
                '@type': 'Organization',
                name: 'CalculaTutto.online',
              },
              publisher: {
                '@type': 'Organization',
                name: 'CalculaTutto.online',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
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
