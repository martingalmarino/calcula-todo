import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DeprezzamentoVeicoliClientIT from './DeprezzamentoVeicoliClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Deprezzamento Veicoli - Calcolo Perdita Valore Auto',
  description: 'Calcola la perdita di valore del tuo veicolo nel tempo usando il metodo lineare. Strumento gratuito per valutare il deprezzamento di auto, moto e camion.',
  keywords: [
    'deprezzamento veicoli',
    'perdita valore auto',
    'calcolo deprezzamento',
    'valore veicolo',
    'metodo lineare',
    'calcolatrice finanziaria'
  ]
})

export default function DeprezzamentoVeicoliPageIT() {
  return <DeprezzamentoVeicoliClientIT />
}
