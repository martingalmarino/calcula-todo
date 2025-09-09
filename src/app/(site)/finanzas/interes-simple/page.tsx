import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import InteresSimpleClient from './InteresSimpleClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de interés simple online gratuita. Calcula intereses para préstamos cortos, descuentos y deudas básicas. Fórmula simple y resultados precisos.',
  canonical: '/finanzas/interes-simple/',
  autoTitle: true,
})

export default function InteresSimplePage() {
  return <InteresSimpleClient />
}
