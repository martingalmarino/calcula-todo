import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PorcentajesClient from './PorcentajesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de porcentajes online para calcular aumentos, descuentos, porcentaje de un número y conversiones. Gratis y fácil de usar.',
  canonical: '/matematicas/porcentajes/',
  autoTitle: true,
})

export default function PorcentajesPage() {
  return <PorcentajesClient />
}