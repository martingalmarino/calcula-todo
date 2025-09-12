import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import PHClient from './PHClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de pH online gratuita. Calcula el pH de una solución a partir de la concentración de iones hidrógeno [H⁺] usando la fórmula pH = -log[H⁺].',
  h1Title: getOptimizedPageTitle('pH'),
  canonical: '/quimica/ph/'
})

export default function PHPage() {
  return <PHClient />
}
