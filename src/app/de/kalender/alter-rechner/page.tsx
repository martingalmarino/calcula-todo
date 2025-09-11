import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AlterRechnerClientDE from './AlterRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Alter-Rechner - Berechnen Sie Ihr genaues Alter kostenlos',
  description: 'Berechnen Sie Ihr genaues Alter in Jahren, Monaten und Tagen. Kostenloser Online-Alter-Rechner mit Schaltjahr-Berücksichtigung.',
  keywords: ['alter rechner', 'geburtstag', 'jahre', 'monate', 'tage', 'alter berechnen', 'schaltjahr']
})

export default function AlterRechnerPage() {
  return <AlterRechnerClientDE />
}
