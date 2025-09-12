import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ProbabilidadSimpleClient from './ProbabilidadSimpleClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Probabilidad Simple - Casos Favorables y Totales',
  description: 'Calcula probabilidad simple dividiendo casos favorables entre casos totales. Resultado en fracción, decimal y porcentaje.',
  keywords: ['probabilidad', 'casos favorables', 'casos totales', 'fracción', 'porcentaje', 'estadística'],
  canonical: '/estadistica/probabilidad-simple/'
})

export default function ProbabilidadSimplePage() {
  return <ProbabilidadSimpleClient />
}
