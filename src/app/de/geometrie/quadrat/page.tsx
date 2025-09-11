import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuadratRechnerClientDE from './QuadratRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Quadrat-Rechner - Fläche und Umfang berechnen',
  description: 'Berechnen Sie Fläche und Umfang eines Quadrats. Kostenloser Online-Rechner für geometrische Berechnungen.',
  keywords: [
    'quadrat rechner',
    'quadrat fläche',
    'quadrat umfang',
    'geometrie',
    'mathematik',
    'fläche berechnen',
    'formel quadrat',
    'seite',
    'deutsch'
  ]
})

export default function QuadratPage() {
  return <QuadratRechnerClientDE />
}
