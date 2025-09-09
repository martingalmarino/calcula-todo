import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DerivateClientIT from './DerivateClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Derivate - Calcolo Derivate Online',
  description: 'Calcola derivate numeriche, analitiche e seconda derivata usando metodi di differenze finite online. Risultati precisi con spiegazioni dettagliate.',
  keywords: [
    'calcolatrice derivate',
    'derivate numeriche',
    'derivate analitiche',
    'seconda derivata',
    'differenze finite',
    'calcolo infinitesimale',
    'matematica'
  ]
})

export default function DerivatePageIT() {
  return <DerivateClientIT />
}