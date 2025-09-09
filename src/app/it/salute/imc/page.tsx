import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { ImcClientIT } from './ImcClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Indice di Massa Corporea (IMC)',
  description: 'Calcola il tuo indice di massa corporea (IMC) in italiano. Scopri se il tuo peso è ideale per la tua altezza con la nostra calcolatrice gratuita.',
  keywords: [
    'IMC',
    'indice massa corporea',
    'BMI',
    'peso ideale',
    'calcolo peso',
    'salute',
    'calcolatrice IMC',
    'peso altezza'
  ]
})

export default function ImcPage() {
  return <ImcClientIT />
}
