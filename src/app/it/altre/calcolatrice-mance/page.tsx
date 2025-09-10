import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalcolatriceManceClientIT from './CalcolatriceManceClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Mance - Calcolo Propina e Divisione Conto',
  description: 'Calcola la mancia appropriata per il servizio. Inserisci l\'importo del conto, percentuale di mancia e numero di persone per dividere il totale.',
  keywords: [
    'calcolatrice mance',
    'calcolo propina',
    'divisione conto',
    'mancia ristorante',
    'percentuale mancia',
    'calcolatrice servizio'
  ]
})

export default function CalcolatriceMancePageIT() {
  return <CalcolatriceManceClientIT />
}
