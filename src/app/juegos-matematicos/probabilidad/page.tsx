import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ProbabilidadClient from './ProbabilidadClient'

export const metadata: Metadata = buildMeta({
  title: 'Juego de Probabilidad - Matemáticas Avanzadas',
  description: 'Calcula probabilidades con dados y cartas en tiempo limitado. Desafía tu comprensión de estadística y probabilidad matemática.',
  keywords: ['probabilidad', 'estadística', 'dados', 'cartas', 'juego matemáticas', 'cálculo probabilidades']
})

export default function ProbabilidadPage() {
  return <ProbabilidadClient />
}
