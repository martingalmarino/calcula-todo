import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SpesaBenzinaViaggiClientIT from './SpesaBenzinaViaggiClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Spesa Benzina per Viaggi - Calcolo Costo Carburante',
  description: 'Calcola il costo del carburante per i tuoi viaggi. Inserisci distanza, consumo e prezzo per litro per ottenere il costo totale del viaggio.',
  keywords: [
    'spesa benzina',
    'costo carburante',
    'calcolo viaggio',
    'consumo auto',
    'prezzo benzina',
    'calcolatrice viaggi'
  ]
})

export default function SpesaBenzinaViaggiPageIT() {
  return <SpesaBenzinaViaggiClientIT />
}
