import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EsercizioFisicoOmsClientIT from './EsercizioFisicoOmsClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('esercizio-fisico-oms')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Esercizio Fisico Minimo Raccomandato (OMS) - Quiz di Attività Fisica',
  description: triviaConfig?.description || 'Impara le raccomandazioni ufficiali dell\'OMS sull\'attività fisica. Scopri quanto esercizio hai bisogno per mantenerti salutare.',
  keywords: triviaConfig?.keywords || ['esercizio', 'attività fisica', 'OMS', 'salute', 'sport', 'fitness', 'raccomandazioni', 'trivia educativa']
})

export default function EsercizioFisicoOmsPage() {
  return <EsercizioFisicoOmsClientIT />
}
