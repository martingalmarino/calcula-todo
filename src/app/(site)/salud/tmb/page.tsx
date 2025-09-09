import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TMBClient from './TMBClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de TMB online gratuita. Calcula tu Tasa Metabólica Basal y descubre cuántas calorías quemas en reposo. Fórmula de Mifflin-St Jeor precisa.',
  autoTitle: true,
})

export default function TMBPage() {
  return <TMBClient />
}
