import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PercentualiClientIT from './PercentualiClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Percentuali - Calcoli Percentuali Online',
  description: 'Calcola percentuali, sconti, aumenti e variazioni percentuali online. Risultati precisi con spiegazioni dettagliate per ogni calcolo.',
  keywords: [
    'calcolatrice percentuali',
    'calcolo percentuali',
    'sconti percentuali',
    'aumenti percentuali',
    'variazione percentuale',
    'percentuali online',
    'matematica'
  ]
})

export default function PercentualiPageIT() {
  return <PercentualiClientIT />
}
