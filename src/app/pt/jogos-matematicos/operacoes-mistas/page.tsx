import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OperacoesMistasClientPT from './OperacoesMistasClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Operações Mistas Rápidas - Jogos Matemáticos',
  description: 'Resolva operações mistas de soma, subtração, multiplicação e divisão rapidamente. Desafie sua agilidade mental!',
  keywords: ['operações mistas', 'soma', 'subtração', 'multiplicação', 'divisão', 'agilidade mental']
})

export default function OperacoesMistasPage() {
  return <OperacoesMistasClientPT />
}
