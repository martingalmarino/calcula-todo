import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ScalaDiVotiClientIT from './ScalaDiVotiClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Scala di Voti - Conversione Punteggi in Lettere A B C D F',
  description: 'Converte punteggi numerici in scala di lettere A, B, C, D, F. Calcolatrice gratuita per valutazioni scolastiche e accademiche.',
  keywords: [
    'scala di voti',
    'conversione voti',
    'punteggi lettere',
    'valutazione scolastica',
    'calcolatrice voti',
    'A B C D F'
  ]
})

export default function ScalaDiVotiPageIT() {
  return <ScalaDiVotiClientIT />
}
