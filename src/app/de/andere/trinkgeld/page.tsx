import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrinkgeldRechnerClientDE from './TrinkgeldRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Trinkgeld-Rechner - Trinkgeld berechnen und teilen',
  description: 'Berechnen Sie Trinkgeld einfach und teilen Sie die Rechnung zwischen mehreren Personen. Inklusive Standard-Prozentsätze und Berechnung pro Person.',
  keywords: [
    'trinkgeld rechner',
    'trinkgeld berechnen',
    'rechnung teilen',
    'restaurant',
    'service',
    'trinkgeld prozent',
    'deutsch'
  ]
})

export default function TrinkgeldPage() {
  return <TrinkgeldRechnerClientDE />
}
