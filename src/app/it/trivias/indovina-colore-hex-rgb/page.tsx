import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import IndovinaColoreHexRgbClientIT from './IndovinaColoreHexRgbClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('indovina-colore-hex-rgb')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Indovina il Colore (HEX ↔ RGB) - Conversione di Colori',
  description: triviaConfig?.description || 'Metti alla prova le tue conoscenze sui codici di colore. Impara a convertire tra codici esadecimali (HEX) e valori RGB in modo divertente.',
  keywords: triviaConfig?.keywords || ['colori', 'hex', 'rgb', 'conversione', 'codici', 'design', 'web', 'palette', 'trivia educativa']
})

export default function IndovinaColoreHexRgbPage() {
  return <IndovinaColoreHexRgbClientIT />
}
