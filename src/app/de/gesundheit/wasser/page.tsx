import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import WasserRechnerClientDE from './WasserRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Wasser-Rechner - Tägliche Wasseraufnahme berechnen',
  description: 'Kostenloser Wasser-Rechner online. Berechnen Sie Ihre tägliche Wasseraufnahme basierend auf Gewicht, Alter und Aktivitätsniveau. Hydratation optimieren.',
  keywords: [
    'wasser rechner',
    'wasseraufnahme',
    'hydratation',
    'flüssigkeitsbedarf',
    'wasser trinken',
    'gesundheit',
    'flüssigkeit'
  ]
})

export default function WasserPageDE() {
  return <WasserRechnerClientDE />
}
