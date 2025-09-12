import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import DilucionesClient from './DilucionesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de diluciones online gratuita. Aplica la fórmula C1V1 = C2V2 para calcular concentraciones y volúmenes en diluciones.',
  h1Title: getOptimizedPageTitle('Diluciones'),
  canonical: '/quimica/diluciones/'
})

export default function DilucionesPage() {
  return <DilucionesClient />
}
