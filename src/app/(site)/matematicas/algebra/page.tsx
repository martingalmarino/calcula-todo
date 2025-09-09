import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import AlgebraClient from './AlgebraClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de álgebra online para resolver ecuaciones lineales, cuadráticas, sistemas 2x2, factorización y vértice de parábolas. Gratis y fácil de usar.',
  h1Title: getOptimizedPageTitle('Álgebra'),
  canonical: '/matematicas/algebra/'
})

export default function AlgebraPage() {
  return <AlgebraClient />
}