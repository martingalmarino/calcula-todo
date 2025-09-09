import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GrasaCorporalClient from './GrasaCorporalClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de porcentaje de grasa corporal online gratuita. Evalúa tu composición corporal usando la fórmula de Deurenberg. Resultados precisos y recomendaciones.',
  autoTitle: true,
})

export default function GrasaCorporalPage() {
  return <GrasaCorporalClient />
}
