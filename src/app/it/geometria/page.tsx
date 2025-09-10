import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GeometriaClientIT from './GeometriaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrici di Geometria - Aree e Perimetri Online',
  description: 'Calcolatrici geometriche per calcolare aree, perimetri e proprietà di figure piane: cerchi, rettangoli, triangoli, quadrati, rombi e trapezi.',
  keywords: [
    'calcolatrici geometria',
    'area cerchio',
    'perimetro rettangolo',
    'area triangolo',
    'area quadrato',
    'area rombo',
    'area trapezio',
    'figure geometriche',
    'matematica',
    'geometria piana'
  ]
})

export default function GeometriaPageIT() {
  return <GeometriaClientIT />
}
