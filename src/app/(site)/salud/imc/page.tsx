import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import IMCClient from './IMCClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de IMC online gratuita. Calcula tu Índice de Masa Corporal y descubre tu categoría de peso ideal. Fórmula precisa y recomendaciones personalizadas.',
  h1Title: getOptimizedPageTitle('IMC'),
  canonical: '/salud/imc/'
})

export default function IMCPage() {
  return <IMCClient />
}
