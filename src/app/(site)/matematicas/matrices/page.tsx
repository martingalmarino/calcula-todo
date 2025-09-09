import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MatricesClient from './MatricesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de matrices online para operaciones básicas, determinante, matriz inversa, transpuesta y multiplicación por escalar. Gratis y fácil de usar.',
  autoTitle: true,
})

export default function MatricesPage() {
  return <MatricesClient />
}