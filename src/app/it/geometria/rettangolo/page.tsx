import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RettangoloClientIT from './RettangoloClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Area e Perimetro del Rettangolo - Calcolatrice Online',
  description: 'Calcola area e perimetro del rettangolo conoscendo base e altezza. Calcolatrice gratuita con formule e spiegazioni passo a passo.',
  keywords: [
    'area rettangolo',
    'perimetro rettangolo',
    'base',
    'altezza',
    'calcolatrice rettangolo',
    'formula rettangolo'
  ]
})

export default function RettangoloPageIT() {
  return <RettangoloClientIT />
}
