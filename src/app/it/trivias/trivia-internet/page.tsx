import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviaInternetClientIT from './TriviaInternetClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Trivia di Internet - Concetti di Reti e Tecnologia',
  description: 'Metti alla prova le tue conoscenze su internet, reti e tecnologia. Impara concetti base di connettività, protocolli e velocità di internet.',
  canonical: '/it/trivias/trivia-internet',
  keywords: ['internet', 'reti', 'velocità', 'protocolli', 'connettività', 'tecnologia', 'banda larga', 'quiz educativo']
})

export default function TriviaInternetPage() {
  return <TriviaInternetClientIT />
}
