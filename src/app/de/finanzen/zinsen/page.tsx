import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ZinsRechnerClientDE from './ZinsRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Zins-Rechner - Einfache Zinsen berechnen',
  description: 'Berechnen Sie einfache Zinsen für Kredite und Investitionen. Kostenloser Online-Rechner für Zinsberechnungen mit detaillierter Erklärung.',
  keywords: [
    'zinsrechner',
    'einfache zinsen',
    'zinsen berechnen',
    'kreditzinsen',
    'anlagezinsen',
    'finanzrechner',
    'zinsberechnung'
  ]
})

export default function ZinsRechnerPageDE() {
  return <ZinsRechnerClientDE />
}
