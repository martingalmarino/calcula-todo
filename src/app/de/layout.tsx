import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { HeaderGerman } from '@/components/HeaderGerman'
import { FooterGerman } from '@/components/FooterGerman'
import { AnalyticsProvider } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CalculaAlles.online – Kostenlose Online-Rechner',
    template: '%s | CalculaAlles.online'
  },
  description: 'Online-Rechner für Mathematik, Finanzen, Gesundheit und mehr. Schnelle und erklärte Ergebnisse, 100% kostenlos.',
  keywords: [
    'online rechner',
    'mathematik',
    'brüche',
    'prozente',
    'algebra',
    'trigonometrie',
    'ableitungen',
    'integrale',
    'matrizen',
    'kombinatorik',
    'folgen',
    'logarithmen',
    'kostenlos',
    'bildung'
  ],
  authors: [{ name: 'CalculaAlles.online' }],
  creator: 'CalculaAlles.online',
  publisher: 'CalculaAlles.online',
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
      'pt': '/pt',
      'de': '/de',
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
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: '/de',
    title: 'CalculaAlles.online – Kostenlose Online-Rechner',
    description: 'Online-Rechner für Mathematik, Finanzen, Gesundheit und mehr. Schnelle und erklärte Ergebnisse, 100% kostenlos.',
    siteName: 'CalculaAlles.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculaAlles.online – Kostenlose Online-Rechner',
    description: 'Online-Rechner für Mathematik, Finanzen, Gesundheit und mehr. Schnelle und erklärte Ergebnisse, 100% kostenlos.',
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

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de-DE" suppressHydrationWarning>
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
              name: 'CalculaAlles.online',
              description: 'Kostenlose Online-Rechner für Mathematik, Finanzen, Gesundheit und mehr. Schnelle und erklärte Ergebnisse Schritt für Schritt.',
              url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/de',
              inLanguage: 'de-DE',
              author: {
                '@type': 'Organization',
                name: 'CalculaAlles.online',
              },
              publisher: {
                '@type': 'Organization',
                name: 'CalculaAlles.online',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <div className="min-h-screen flex flex-col">
            <HeaderGerman />
            <main className="flex-1">
              {children}
            </main>
            <FooterGerman />
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
