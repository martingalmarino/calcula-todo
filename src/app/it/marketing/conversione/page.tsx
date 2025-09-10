import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConversioneClientIT from './ConversioneClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Conversione',
  description: 'Analizza le tue conversioni e ottimizza il funnel di vendita per migliorare i risultati delle tue campagne.',
  keywords: ['conversione', 'funnel', 'lead', 'vendite', 'marketing']
})

export default function ConversionePage() {
  return <ConversioneClientIT />
}
