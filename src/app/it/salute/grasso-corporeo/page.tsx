import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GrassoCorporeoClientIT from './GrassoCorporeoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Percentuale di Grasso Corporeo',
  description: 'Calcola la percentuale di grasso corporeo in italiano. Stima la composizione corporea per monitorare la tua forma fisica e salute.',
  keywords: [
    'grasso corporeo',
    'percentuale grasso',
    'composizione corporea',
    'massa grassa',
    'massa magra',
    'calcolatrice grasso',
    'salute',
    'fitness'
  ]
})

export default function GrassoCorporeoPage() {
  return <GrassoCorporeoClientIT />
}
