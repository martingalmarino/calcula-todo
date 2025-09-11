import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KaffeeSparRechnerClientDE from './KaffeeSparRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Kaffee-Spar-Rechner - Geld sparen durch Verzicht auf täglichen Kaffee',
  description: 'Kostenloser Kaffee-Spar-Rechner online. Berechnen Sie, wie viel Sie sparen könnten, wenn Sie auf täglichen Kaffee verzichten. Zinseszins-Effekt inklusive.',
  keywords: [
    'kaffee sparen',
    'geld sparen',
    'zinsen',
    'investition',
    'kaffee kosten',
    'sparplan'
  ]
})

export default function KaffeeSparPageDE() {
  return <KaffeeSparRechnerClientDE />
}
