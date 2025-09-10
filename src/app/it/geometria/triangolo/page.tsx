import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriangoloClientIT from './TriangoloClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Area del Triangolo - Calcolatrice Online',
  description: 'Calcola l\'area del triangolo con diversi metodi: base e altezza, formula di Erone. Calcolatrice gratuita con formule e spiegazioni.',
  keywords: [
    'area triangolo',
    'base',
    'altezza',
    'formula di Erone',
    'calcolatrice triangolo',
    'formula triangolo'
  ]
})

export default function TriangoloPageIT() {
  return <TriangoloClientIT />
}
