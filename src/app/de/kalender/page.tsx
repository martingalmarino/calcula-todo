import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KalenderClientDE from './KalenderClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Kalender-Rechner - Kostenlose Online-Tools für Datum und Zeit',
  description: 'Berechnen Sie Ihr Alter, Tage zwischen Daten, Urlaubstage, Stunden und Minuten sowie Datumsoperationen. Alle Kalender-Tools kostenlos und einfach zu verwenden.',
  keywords: ['kalender', 'datum', 'zeit', 'alter', 'urlaubstage', 'tage berechnen', 'stunden minuten', 'datum rechner']
})

export default function KalenderPage() {
  return <KalenderClientDE />
}
