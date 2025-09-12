import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GiocoConsumoElettricoClientIT from './GiocoConsumoElettricoClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('gioco-consumo-elettrico')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Gioco di Consumo Elettrico - Efficienza Energetica in Casa',
  description: triviaConfig?.description || 'Impara sull\'efficienza energetica e il consumo elettrico in casa. Scopri quali elettrodomestici consumano più energia e come risparmiare sulla bolletta.',
  keywords: triviaConfig?.keywords || ['consumo elettrico', 'efficienza energetica', 'elettrodomestici', 'risparmio energetico', 'bolletta luce', 'sostenibilità', 'energia', 'gioco educativo']
})

export default function GiocoConsumoElettricoPage() {
  return <GiocoConsumoElettricoClientIT />
}
