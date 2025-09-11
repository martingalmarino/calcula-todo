import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrapezioClientPT from './TrapezioClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área do Trapézio',
  description: 'Calcula a área de um trapézio conhecendo suas bases e altura. Ferramenta gratuita e fácil de usar.',
  keywords: [
    'trapézio',
    'área',
    'bases',
    'altura',
    'lados paralelos',
    'geometria',
    'matemática'
  ]
})

export default function TrapezioPage() {
  return <TrapezioClientPT />
}
