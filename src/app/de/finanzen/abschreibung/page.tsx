import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AbschreibungsRechnerClientDE from './AbschreibungsRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Abschreibungs-Rechner - Fahrzeugabschreibung berechnen',
  description: 'Berechnen Sie den Wertverlust Ihres Fahrzeugs über die Zeit. Kostenloser Online-Rechner für lineare Abschreibung von Autos und Fahrzeugen.',
  keywords: [
    'abschreibungsrechner',
    'fahrzeugabschreibung',
    'autowert',
    'wertverlust',
    'lineare abschreibung',
    'finanzrechner',
    'fahrzeugwert'
  ]
})

export default function AbschreibungsRechnerPageDE() {
  return <AbschreibungsRechnerClientDE />
}
