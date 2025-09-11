import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import BierPartyRechnerClientDE from './BierPartyRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Bier-Party-Rechner - Bierbedarf für Ihre Party berechnen',
  description: 'Kostenloser Bier-Party-Rechner online. Berechnen Sie, wie viel Bier Sie für Ihre Party benötigen. Perfekte Party-Planung.',
  keywords: [
    'bier party',
    'party planung',
    'bier berechnen',
    'gäste',
    'konsum',
    'party vorbereitung'
  ]
})

export default function BierPartyPageDE() {
  return <BierPartyRechnerClientDE />
}
