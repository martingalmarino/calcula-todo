import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RomboClientIT from './RomboClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Area e Perimetro del Rombo - Calcolatrice Online',
  description: 'Calcola area e perimetro del rombo conoscendo le diagonali o il lato. Calcolatrice gratuita con formule e spiegazioni passo a passo.',
  keywords: [
    'area rombo',
    'perimetro rombo',
    'diagonali',
    'lato',
    'calcolatrice rombo',
    'formula rombo'
  ]
})

export default function RomboPageIT() {
  return <RomboClientIT />
}
