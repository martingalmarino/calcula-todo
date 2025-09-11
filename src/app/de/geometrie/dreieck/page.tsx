import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DreieckRechnerClientDE from './DreieckRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Dreieck-Rechner - Fläche und Umfang berechnen',
  description: 'Berechnen Sie Fläche und Umfang eines Dreiecks mit verschiedenen Methoden. Kostenloser Online-Rechner für geometrische Berechnungen.',
  keywords: [
    'dreieck rechner',
    'dreieck fläche',
    'dreieck umfang',
    'geometrie',
    'mathematik',
    'fläche berechnen',
    'formel dreieck',
    'höhe basis',
    'deutsch'
  ]
})

export default function DreieckPage() {
  return <DreieckRechnerClientDE />
}
