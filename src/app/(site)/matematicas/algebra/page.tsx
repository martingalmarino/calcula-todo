import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AlgebraClient from './AlgebraClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de álgebra online para resolver ecuaciones lineales, cuadráticas, sistemas 2x2, factorización y vértice de parábolas. Gratis y fácil de usar.',
  canonical: '/matematicas/algebra/',
  autoTitle: true,
})

export default function AlgebraPage() {
  return <AlgebraClient />
}