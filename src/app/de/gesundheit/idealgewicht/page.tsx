import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import IdealgewichtRechnerClientDE from './IdealgewichtRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Idealgewicht-Rechner - Optimales Gewicht berechnen',
  description: 'Kostenloser Idealgewicht-Rechner online. Berechnen Sie Ihr ideales Gewicht basierend auf Größe und Geschlecht. Präzise Gewichtsberechnung.',
  keywords: [
    'idealgewicht rechner',
    'optimales gewicht',
    'gewicht berechnen',
    'devine formel',
    'gesundheitsrechner',
    'gewicht ziel',
    'körpergewicht'
  ]
})

export default function IdealgewichtPageDE() {
  return <IdealgewichtRechnerClientDE />
}
