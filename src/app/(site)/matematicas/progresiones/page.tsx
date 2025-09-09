import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ProgresionesClient from './ProgresionesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de progresiones online para aritméticas, geométricas, términos n-ésimos, sumas, series infinitas y verificación. Gratis y fácil de usar.',
  canonical: '/matematicas/progresiones/',
  autoTitle: true,
})

export default function ProgresionesPage() {
  return <ProgresionesClient />
}