import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KussKalorienRechnerClientDE from './KussKalorienRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Kuss-Kalorien-Rechner - Kalorien durch Küsse, Umarmungen und Lachen',
  description: 'Kostenloser Kuss-Kalorien-Rechner online. Berechnen Sie Kalorien, die durch Küsse, Umarmungen und Lachen verbrannt werden. Entdecken Sie lustige Äquivalenzen.',
  keywords: [
    'kuss kalorien',
    'umarmungen kalorien',
    'lachen kalorien',
    'kalorien verbrennen',
    'liebe gesundheit',
    'aktivitäten kalorien'
  ]
})

export default function KussKalorienPageDE() {
  return <KussKalorienRechnerClientDE />
}
