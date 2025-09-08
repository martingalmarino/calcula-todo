import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CombinatoriaClient from './CombinatoriaClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de combinatoria online para factorial, permutaciones, combinaciones, subconjuntos, arreglos circulares y triángulo de Pascal. Gratis y fácil de usar.',
  canonical: '/matematicas/combinatoria/',
  autoTitle: true,
})

export default function CombinatoriaPage() {
  return <CombinatoriaClient />
}