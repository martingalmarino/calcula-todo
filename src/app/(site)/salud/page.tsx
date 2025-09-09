import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SaludClient from './SaludClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Salud - IMC, TMB, Grasa Corporal y PaFi',
  description: 'Calculadoras de salud online gratuitas: IMC (Índice de Masa Corporal), TMB (Tasa Metabólica Basal), porcentaje de grasa corporal y PaFi. Herramientas médicas precisas.',
  keywords: [
    'calculadoras de salud',
    'IMC',
    'índice masa corporal',
    'TMB',
    'tasa metabólica basal',
    'grasa corporal',
    'PaFi',
    'presión arterial',
    'frecuencia cardíaca',
    'salud online',
    'calculadoras médicas'
  ]
})

export default function SaludPage() {
  return <SaludClient />
}
