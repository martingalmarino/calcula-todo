import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalculadoraEdadClient from './CalculadoraEdadClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de edad online gratuita. Calcula tu edad exacta en años, meses y días desde tu fecha de nacimiento. Herramienta de calendario precisa.',
  canonical: '/calendario/calculadora-edad/',
  autoTitle: true,
})

export default function CalculadoraEdadPage() {
  return <CalculadoraEdadClient />
}
