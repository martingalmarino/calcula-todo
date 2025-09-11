import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SchlafRechnerClientDE from './SchlafRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Schlaf-Rechner - Optimale Schlafzeiten berechnen',
  description: 'Kostenloser Schlaf-Rechner online. Berechnen Sie optimale Schlafzeiten basierend auf Schlafzyklen. Verbessern Sie Ihre Schlafqualität.',
  keywords: [
    'schlaf rechner',
    'schlafzyklen',
    'schlafzeiten',
    'schlaf optimierung',
    'erholung',
    'schlafqualität',
    'gesunder schlaf'
  ]
})

export default function SchlafPageDE() {
  return <SchlafRechnerClientDE />
}
