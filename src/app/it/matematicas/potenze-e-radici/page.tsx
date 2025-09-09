import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PotenzeRadiciClientIT from './PotenzeRadiciClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Potenze e Radici - Calcoli di Potenze e Radici Online',
  description: 'Calcola potenze, radici quadrate, cubiche, n-esime e notazione scientifica online. Risultati precisi con spiegazioni dettagliate.',
  keywords: [
    'calcolatrice potenze',
    'calcolatrice radici',
    'radice quadrata',
    'radice cubica',
    'potenze online',
    'notazione scientifica',
    'matematica'
  ]
})

export default function PotenzeRadiciPageIT() {
  return <PotenzeRadiciClientIT />
}