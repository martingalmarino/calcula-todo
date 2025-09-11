import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ZukunftswertRechnerClientDE from './ZukunftswertRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Zukunftswert-Rechner - Barwert und Zukunftswert berechnen',
  description: 'Berechnen Sie den zukünftigen Wert von Investitionen und den Barwert zukünftiger Summen. Kostenloser Online-Rechner für Zeitwert des Geldes.',
  keywords: [
    'zukunftswertrechner',
    'barwertrechner',
    'zeitwert des geldes',
    'investitionsrechnung',
    'zukunftswert berechnen',
    'barwert berechnen',
    'finanzrechner'
  ]
})

export default function ZukunftswertRechnerPageDE() {
  return <ZukunftswertRechnerClientDE />
}
