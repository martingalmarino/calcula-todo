import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrapezioClientIT from './TrapezioClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Area del Trapezio - Calcolatrice Online',
  description: 'Calcola l\'area del trapezio conoscendo le basi e l\'altezza. Calcolatrice gratuita con formule e spiegazioni passo a passo.',
  keywords: [
    'area trapezio',
    'basi',
    'altezza',
    'trapezio isoscele',
    'calcolatrice trapezio',
    'formula trapezio'
  ]
})

export default function TrapezioPageIT() {
  return <TrapezioClientIT />
}
