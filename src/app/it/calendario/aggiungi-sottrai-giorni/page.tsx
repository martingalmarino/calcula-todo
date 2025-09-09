import { Metadata } from 'next'
import AggiungiSottraiGiorniClientIT from './AggiungiSottraiGiorniClientIT'

export const metadata: Metadata = {
  title: 'Aggiungi/Sottrai Giorni a una Data - CalculaTodo.online',
  description: 'Aggiungi o sottrai giorni a una data specifica. Calcola date future o passate facilmente con la nostra calcolatrice di date.',
  keywords: 'aggiungi giorni, sottrai giorni, calcolo date, data futura, data passata, calcolatrice date, italiano',
  openGraph: {
    title: 'Aggiungi/Sottrai Giorni a una Data - CalculaTodo.online',
    description: 'Aggiungi o sottrai giorni a una data specifica. Calcola date future o passate facilmente con la nostra calcolatrice di date.',
    type: 'website',
  },
}

export default function AggiungiSottraiGiorniPage() {
  return <AggiungiSottraiGiorniClientIT />
}
