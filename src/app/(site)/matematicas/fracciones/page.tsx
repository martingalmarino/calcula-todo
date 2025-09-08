import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FraccionesClient from './FraccionesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Fracciones – Simplificar, operaciones y conversión a decimal',
  description: 'Calculadora de fracciones online para simplificar, operaciones básicas, conversión a decimal y cálculos con fracciones. Gratis y fácil de usar.',
  canonical: '/matematicas/fracciones/',
})

export default function FraccionesPage() {
  return <FraccionesClient />
}