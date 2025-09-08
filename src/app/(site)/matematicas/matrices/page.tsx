import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MatricesClient from './MatricesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Matrices – Suma, resta, multiplicación, determinante e inversa',
  description: 'Calculadora de matrices online para operaciones básicas, determinante, matriz inversa, transpuesta y multiplicación por escalar. Gratis y fácil de usar.',
  canonical: '/matematicas/matrices/',
})

export default function MatricesPage() {
  return <MatricesClient />
}