import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CombinatoriaClient from './CombinatoriaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Combinatoria – Factorial, permutaciones, combinaciones y más',
  description: 'Calculadora de combinatoria online para factorial, permutaciones, combinaciones, subconjuntos, arreglos circulares y triángulo de Pascal. Gratis y fácil de usar.',
  canonical: '/matematicas/combinatoria/',
})

export default function CombinatoriaPage() {
  return <CombinatoriaClient />
}