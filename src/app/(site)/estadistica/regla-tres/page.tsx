import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ReglaTresClient from './ReglaTresClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Regla de Tres - Proporciones y Análisis Estadístico',
  description: 'Calcula proporciones usando la regla de tres. Útil para análisis de encuestas, extrapolación de datos y cálculos proporcionales.',
  keywords: ['regla de tres', 'proporciones', 'encuestas', 'análisis', 'estadística', 'extrapolación'],
  canonical: '/estadistica/regla-tres/'
})

export default function ReglaTresPage() {
  return <ReglaTresClient />
}
