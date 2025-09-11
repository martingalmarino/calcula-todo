import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TageZwischenDatenClientDE from './TageZwischenDatenClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Tage zwischen Daten - Berechnen Sie die Anzahl der Tage zwischen zwei Daten',
  description: 'Berechnen Sie die genaue Anzahl der Tage zwischen zwei Daten. Kostenloser Online-Rechner mit Schaltjahr-Berücksichtigung.',
  keywords: ['tage zwischen daten', 'datum differenz', 'zeitraum', 'kalender', 'tage berechnen', 'schaltjahr']
})

export default function TageZwischenDatenPage() {
  return <TageZwischenDatenClientDE />
}
