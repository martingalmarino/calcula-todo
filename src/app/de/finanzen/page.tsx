import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FinanzenClientDE from './FinanzenClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Finanzrechner - Zinsen, Darlehen, Inflation und mehr',
  description: 'Kostenlose Online-Finanzrechner: Zinsen, Darlehen, Inflation, Sparen, Abschreibung, Zukunftswert. Präzise Finanzberechnungen für Ihre Planung.',
  keywords: [
    'finanzrechner',
    'zinsen',
    'darlehen',
    'inflation',
    'sparen',
    'abschreibung',
    'zukunftswert',
    'finanzen online',
    'finanzplanung'
  ]
})

export default function FinanzenPageDE() {
  return <FinanzenClientDE />
}
