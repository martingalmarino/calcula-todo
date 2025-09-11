import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrapezRechnerClientDE from './TrapezRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Trapez-Rechner - Fläche und Umfang berechnen',
  description: 'Berechnen Sie Fläche und Umfang eines Trapezes. Kostenloser Online-Rechner für geometrische Berechnungen.',
  keywords: [
    'trapez rechner',
    'trapez fläche',
    'trapez umfang',
    'geometrie',
    'mathematik',
    'fläche berechnen',
    'formel trapez',
    'höhe basis',
    'deutsch'
  ]
})

export default function TrapezPage() {
  return <TrapezRechnerClientDE />
}
