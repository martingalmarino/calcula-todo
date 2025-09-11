import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KlickZaehlerClientDE from './KlickZaehlerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Klick-Zähler - Geschwindigkeitstest Online',
  description: 'Testen Sie Ihre Klickgeschwindigkeit und messen Sie Clicks pro Sekunde (CPS). Kostenloser Online-Test für Reaktionsgeschwindigkeit und Fingerfertigkeit.',
  keywords: [
    'klick zähler',
    'klick geschwindigkeit',
    'cps test',
    'reaktion test',
    'fingerfertigkeit',
    'klick test',
    'geschwindigkeit',
    'deutsch'
  ]
})

export default function KlickZaehlerPage() {
  return <KlickZaehlerClientDE />
}
