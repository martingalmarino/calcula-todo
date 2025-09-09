import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import TMBClient from './TMBClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de TMB online gratuita. Calcula tu Tasa Metabólica Basal y descubre cuántas calorías quemas en reposo. Fórmula de Mifflin-St Jeor precisa.',
  h1Title: getOptimizedPageTitle('TMB'),
  canonical: '/salud/tmb/'
})

export default function TMBPage() {
  return <TMBClient />
}
