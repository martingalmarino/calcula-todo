import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SparRechnerClientDE from './SparRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Spar-Rechner - Sparziel und monatliche Sparrate berechnen',
  description: 'Berechnen Sie, wie viel Sie monatlich sparen müssen, um Ihr Sparziel zu erreichen. Kostenloser Online-Rechner für Sparplanung und Ziele.',
  keywords: [
    'sparrechner',
    'sparziel',
    'sparplanung',
    'monatliche sparrate',
    'sparen berechnen',
    'finanzrechner',
    'sparplan'
  ]
})

export default function SparRechnerPageDE() {
  return <SparRechnerClientDE />
}
