import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import EnergiaEnlaceClient from './EnergiaEnlaceClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de energía de enlace online gratuita. Calcula la variación de energía (ΔH) en reacciones químicas usando enlaces rotos y formados.',
  h1Title: getOptimizedPageTitle('Energía de Enlace'),
  canonical: '/quimica/energia-enlace/'
})

export default function EnergiaEnlacePage() {
  return <EnergiaEnlaceClient />
}
