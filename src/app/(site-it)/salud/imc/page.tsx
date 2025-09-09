import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import IMCClientIT from './ImcClient'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice IMC - Indice di Massa Corporea',
  description: 'Calcola il tuo IMC gratis con la nostra calcolatrice online. Scopri la tua categoria di peso ideale e ottieni consigli per la salute.',
  keywords: [
    'calcolatrice IMC',
    'indice massa corporea',
    'calcolo peso',
    'peso ideale',
    'salute',
    'calcolatrice online',
    'gratis'
  ]
})

export default function IMCPageIT() {
  return <IMCClientIT />
}
