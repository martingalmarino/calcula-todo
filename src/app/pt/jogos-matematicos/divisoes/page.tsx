import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DivisoesClientPT from './DivisoesClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora Mental de Divisões - Jogos Matemáticos',
  description: 'Pratique divisões mentais em tempo limitado. Desafie sua agilidade mental e melhore seu cálculo mental!',
  keywords: ['divisões', 'cálculo mental', 'agilidade mental', 'matemática', 'prática', 'velocidade']
})

export default function DivisoesPage() {
  return <DivisoesClientPT />
}
