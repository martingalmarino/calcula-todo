import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PorcentajesClient from './PorcentajesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Porcentajes – Aumento, descuento, porcentaje de un número',
  description: 'Calculadora de porcentajes online para calcular aumentos, descuentos, porcentaje de un número y conversiones. Gratis y fácil de usar.',
  canonical: '/matematicas/porcentajes/',
})

export default function PorcentajesPage() {
  return <PorcentajesClient />
}