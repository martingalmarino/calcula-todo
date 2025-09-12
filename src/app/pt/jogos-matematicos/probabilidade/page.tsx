import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ProbabilidadeClientPT from './ProbabilidadeClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Jogo de Probabilidade - Jogos Matemáticos',
  description: 'Calcule probabilidades com dados, cartas e moedas em tempo limitado. Desafie sua compreensão estatística!',
  keywords: ['probabilidade', 'estatística', 'dados', 'cartas', 'moedas', 'avançado']
})

export default function ProbabilidadePage() {
  return <ProbabilidadeClientPT />
}
