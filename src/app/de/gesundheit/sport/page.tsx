import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SportRechnerClientDE from './SportRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Sport-Rechner - Kalorien beim Sport berechnen',
  description: 'Kostenloser Sport-Rechner online. Berechnen Sie verbrannte Kalorien bei verschiedenen Sportarten und Intensitäten. Fitness-Tracking optimieren.',
  keywords: [
    'sport rechner',
    'kalorien verbrennen',
    'fitness rechner',
    'sport kalorien',
    'training kalorien',
    'bewegung',
    'fitness tracking'
  ]
})

export default function SportPageDE() {
  return <SportRechnerClientDE />
}
