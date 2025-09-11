import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RechteckRechnerClientDE from './RechteckRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Rechteck-Rechner - Fläche und Umfang berechnen',
  description: 'Berechnen Sie Fläche und Umfang eines Rechtecks, wenn Sie die Abmessungen kennen oder umgekehrt. Kostenloser Online-Rechner für geometrische Berechnungen.',
  keywords: [
    'rechteck rechner',
    'rechteck fläche',
    'rechteck umfang',
    'geometrie',
    'mathematik',
    'fläche berechnen',
    'formel rechteck',
    'länge breite',
    'deutsch'
  ]
})

export default function RechteckPage() {
  return <RechteckRechnerClientDE />
}
