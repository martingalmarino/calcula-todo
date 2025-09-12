import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SomaSubtracaoClientPT from './SomaSubtracaoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Soma e Subtração contra Relógio - Jogos Matemáticos',
  description: 'Resolva operações de soma e subtração em 30 segundos. Demonstre sua velocidade mental!',
  keywords: ['soma', 'subtração', 'velocidade', 'cálculo mental', 'agilidade']
})

export default function SomaSubtracaoPage() {
  return <SomaSubtracaoClientPT />
}
