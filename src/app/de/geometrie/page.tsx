import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GeometrieClientDE from './GeometrieClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Geometrie Rechner - Fläche und Umfang berechnen',
  description: 'Entdecken Sie unsere Sammlung von Geometrie-Rechnern: Kreis, Rechteck, Dreieck, Quadrat, Raute und Trapez. Berechnen Sie Flächen und Umfänge mit präzisen Formeln.',
  keywords: [
    'geometrie rechner',
    'fläche berechnen',
    'umfang berechnen',
    'kreis',
    'rechteck',
    'dreieck',
    'quadrat',
    'raute',
    'trapez',
    'mathematik',
    'deutsch'
  ]
})

export default function GeometriePage() {
  return <GeometrieClientDE />
}
