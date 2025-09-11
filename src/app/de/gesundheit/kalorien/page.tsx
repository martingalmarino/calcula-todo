import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KalorienRechnerClientDE from './KalorienRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Kalorien-Rechner - Täglichen Kalorienbedarf berechnen',
  description: 'Kostenloser Kalorien-Rechner online. Berechnen Sie Ihren täglichen Kalorienbedarf basierend auf Gewicht, Größe, Alter und Aktivitätsniveau.',
  keywords: [
    'kalorien rechner',
    'kalorienbedarf',
    'tägliche kalorien',
    'stoffwechsel',
    'ernährung',
    'energiebedarf',
    'mifflin st jeor'
  ]
})

export default function KalorienPageDE() {
  return <KalorienRechnerClientDE />
}
