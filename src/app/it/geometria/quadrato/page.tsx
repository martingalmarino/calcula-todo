import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuadratoClientIT from './QuadratoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Area e Perimetro del Quadrato - Calcolatrice Online',
  description: 'Calcola area e perimetro del quadrato conoscendo il lato. Calcolatrice gratuita con formule e spiegazioni passo a passo.',
  keywords: [
    'area quadrato',
    'perimetro quadrato',
    'lato',
    'calcolatrice quadrato',
    'formula quadrato'
  ]
})

export default function QuadratoPageIT() {
  return <QuadratoClientIT />
}
