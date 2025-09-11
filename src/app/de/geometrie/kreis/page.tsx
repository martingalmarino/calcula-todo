import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KreisRechnerClientDE from './KreisRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Kreis-Rechner - Fläche und Umfang berechnen',
  description: 'Berechnen Sie Fläche, Umfang, Durchmesser und Radius eines Kreises mit präzisen Formeln. Kostenloser Online-Rechner für geometrische Berechnungen.',
  keywords: [
    'kreis rechner',
    'kreis fläche',
    'kreis umfang',
    'radius',
    'durchmesser',
    'geometrie',
    'mathematik',
    'fläche berechnen',
    'formel kreis',
    'deutsch'
  ]
})

export default function KreisPage() {
  return <KreisRechnerClientDE />
}
