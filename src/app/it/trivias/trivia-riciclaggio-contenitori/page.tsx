import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviaRiciclaggioContenitoriClientIT from './TriviaRiciclaggioContenitoriClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Trivia di Riciclaggio: Cosa va in ogni contenitore? - Classificazione Rifiuti',
  description: 'Impara sulla corretta classificazione dei rifiuti e riciclaggio. Scopri cosa va in ogni contenitore per prenderti cura dell\'ambiente.',
  canonical: '/it/trivias/trivia-riciclaggio-contenitori',
  keywords: ['riciclaggio', 'rifiuti', 'contenitori', 'ambiente', 'sostenibilità', 'ecologia', 'separazione', 'quiz educativo']
})

export default function TriviaRiciclaggioContenitoriPage() {
  return <TriviaRiciclaggioContenitoriClientIT />
}
