import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ConditionalLayout } from '@/components/ConditionalLayout'
import { AnalyticsProvider } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CalculaTodo.online – Matemáticas Gratis y Paso a Paso',
    template: '%s | CalculaTodo.online'
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
  authors: [{ name: 'CalculaTodo.online' }],
  creator: 'CalculaTodo.online',
  publisher: 'CalculaTodo.online',
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
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    title: 'CalculaTodo.online – Matemáticas Gratis y Paso a Paso',
    description: 'Calculadoras matemáticas online: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados, 100% gratis.',
    siteName: 'CalculaTodo.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculaTodo.online – Matemáticas Gratis y Paso a Paso',
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
        <meta name="google-site-verification" content="u-MVoJHGUNMJadZ7ojXLQK1ELhcuh2gEU3eWmAJTNmE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CalculaTodo.online',
              description: 'Calculadoras matemáticas online gratuitas: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados paso a paso.',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online',
              inLanguage: 'es-AR',
              author: {
                '@type': 'Organization',
                name: 'CalculaTodo.online',
              },
              publisher: {
                '@type': 'Organization',
                name: 'CalculaTodo.online',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <div className="min-h-screen flex flex-col">
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
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