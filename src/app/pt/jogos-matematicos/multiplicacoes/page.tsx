import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MultiplicacoesClientPT from './MultiplicacoesClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora Mental de Multiplicações - Jogos Matemáticos',
  description: 'Pratique multiplicações mentais em tempo limitado. Desafie sua agilidade mental e melhore seu cálculo mental!',
  keywords: ['multiplicações', 'cálculo mental', 'agilidade mental', 'matemática', 'prática', 'velocidade']
})

export default function MultiplicacoesPage() {
  return <MultiplicacoesClientPT />
}
