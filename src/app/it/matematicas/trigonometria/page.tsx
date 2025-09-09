import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrigonometriaClientIT from './TrigonometriaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Trigonometria - Funzioni Trigonometriche Online',
  description: 'Calcola funzioni trigonometriche, funzioni inverse e applica il teorema di Pitagora online. Risultati precisi con spiegazioni dettagliate.',
  keywords: [
    'calcolatrice trigonometria',
    'funzioni trigonometriche',
    'seno coseno tangente',
    'teorema pitagora',
    'funzioni inverse',
    'trigonometria online',
    'matematica'
  ]
})

export default function TrigonometriaPageIT() {
  return <TrigonometriaClientIT />
}