import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FraccionesClient from './FraccionesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de fracciones online para simplificar, operaciones básicas, conversión a decimal y cálculos con fracciones. Gratis y fácil de usar.',
  autoTitle: true,
})

export default function FraccionesPage() {
  return <FraccionesClient />
}