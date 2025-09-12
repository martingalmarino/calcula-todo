import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import GasesIdealesClient from './GasesIdealesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de Ley de Gases Ideales online gratuita. Aplica la ecuación PV = nRT para calcular presión, volumen, moles o temperatura.',
  h1Title: getOptimizedPageTitle('Gases Ideales'),
  canonical: '/quimica/gases-ideales/'
})

export default function GasesIdealesPage() {
  return <GasesIdealesClient />
}
