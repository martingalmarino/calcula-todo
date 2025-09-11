import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RauteRechnerClientDE from './RauteRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Raute-Rechner - Fläche und Umfang berechnen',
  description: 'Berechnen Sie Fläche und Umfang einer Raute. Kostenloser Online-Rechner für geometrische Berechnungen.',
  keywords: [
    'raute rechner',
    'raute fläche',
    'raute umfang',
    'geometrie',
    'mathematik',
    'fläche berechnen',
    'formel raute',
    'diagonale',
    'deutsch'
  ]
})

export default function RautePage() {
  return <RauteRechnerClientDE />
}
