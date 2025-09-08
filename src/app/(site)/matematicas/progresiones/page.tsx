import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ProgresionesClient from './ProgresionesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Progresiones – Aritméticas, geométricas y series infinitas',
  description: 'Calculadora de progresiones online para aritméticas, geométricas, términos n-ésimos, sumas, series infinitas y verificación. Gratis y fácil de usar.',
  canonical: '/matematicas/progresiones/',
})

export default function ProgresionesPage() {
  return <ProgresionesClient />
}