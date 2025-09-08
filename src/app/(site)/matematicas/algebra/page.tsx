import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AlgebraClient from './AlgebraClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Álgebra – Resuelve ecuaciones lineales, cuadráticas y sistemas',
  description: 'Calculadora de álgebra online para resolver ecuaciones lineales, cuadráticas, sistemas 2x2, factorización y vértice de parábolas. Gratis y fácil de usar.',
  canonical: '/matematicas/algebra/',
})

export default function AlgebraPage() {
  return <AlgebraClient />
}