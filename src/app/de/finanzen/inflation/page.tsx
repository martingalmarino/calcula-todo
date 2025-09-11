import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import InflationsRechnerClientDE from './InflationsRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Inflations-Rechner - Kaufkraft und Inflation berechnen',
  description: 'Berechnen Sie die Auswirkungen der Inflation auf Ihre Kaufkraft. Kostenloser Online-Rechner für Verbraucherpreisindex und Kaufkraftverlust.',
  keywords: [
    'inflationsrechner',
    'kaufkraft',
    'verbraucherpreisindex',
    'inflation berechnen',
    'preissteigerung',
    'geldwert',
    'finanzrechner'
  ]
})

export default function InflationsRechnerPageDE() {
  return <InflationsRechnerClientDE />
}
