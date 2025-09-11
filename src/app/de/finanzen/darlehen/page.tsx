import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DarlehenRechnerClientDE from './DarlehenRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Darlehen-Rechner - Hypothek und Kredit berechnen',
  description: 'Berechnen Sie monatliche Raten, Gesamtzinsen und Tilgungsplan für Ihr Darlehen. Kostenloser Online-Rechner für Hypotheken und Kredite.',
  keywords: [
    'darlehenrechner',
    'hypothekenrechner',
    'kreditrechner',
    'monatliche raten',
    'tilgungsplan',
    'finanzrechner',
    'immobilienkredit'
  ]
})

export default function DarlehenRechnerPageDE() {
  return <DarlehenRechnerClientDE />
}
