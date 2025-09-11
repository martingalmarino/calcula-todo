import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import BenzinReiseRechnerClientDE from './BenzinReiseRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Benzin-Reise-Rechner - Kraftstoffkosten berechnen',
  description: 'Berechnen Sie Kraftstoffkosten pro Kilometer und Gesamtausgaben für Ihre Reise. Kostenloser Online-Rechner für Benzinverbrauch und Reisekosten.',
  keywords: [
    'benzin reise',
    'kraftstoff',
    'kosten',
    'verbrauch',
    'reise',
    'kilometer',
    'spritkosten',
    'deutsch'
  ]
})

export default function BenzinReisePage() {
  return <BenzinReiseRechnerClientDE />
}
