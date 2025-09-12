import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviaInternetClient from './TriviaInternetClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('trivia-internet')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Trivia de Internet - Conceptos de Redes y Tecnología',
  description: triviaConfig?.description || 'Pon a prueba tus conocimientos sobre internet, redes y tecnología. Aprende conceptos básicos de conectividad, protocolos y velocidad de internet.',
  keywords: triviaConfig?.keywords || ['internet', 'redes', 'velocidad', 'protocolos', 'conectividad', 'tecnología', 'banda ancha', 'trivia educativa']
})

export default function TriviaInternetPage() {
  return <TriviaInternetClient />
}
