import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { OvulazioneClientIT } from './OvulazioneClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Ovulazione',
  description: 'Calcola i giorni fertili e il periodo di ovulazione in italiano. Scopri i giorni più fertili del tuo ciclo mestruale per la pianificazione familiare.',
  keywords: [
    'ovulazione',
    'giorni fertili',
    'ciclo mestruale',
    'fertilità',
    'pianificazione familiare',
    'calendario ovulazione',
    'calcolatrice fertilità',
    'periodo fertile'
  ]
})

export default function OvulazionePage() {
  return <OvulazioneClientIT />
}
