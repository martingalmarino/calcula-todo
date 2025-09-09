import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AlgebraClientIT from './AlgebraClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Algebra - Risoluzione Equazioni Online',
  description: 'Risolvi equazioni lineari, quadratiche, sistemi 2x2, fattorizzazione e vertice di parabole online. Risultati precisi con spiegazioni dettagliate.',
  keywords: [
    'calcolatrice algebra',
    'risoluzione equazioni',
    'equazioni lineari',
    'equazioni quadratiche',
    'sistemi equazioni',
    'fattorizzazione',
    'vertice parabola',
    'matematica'
  ]
})

export default function AlgebraPageIT() {
  return <AlgebraClientIT />
}