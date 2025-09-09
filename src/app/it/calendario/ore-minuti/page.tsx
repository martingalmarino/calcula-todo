import { Metadata } from 'next'
import OreMinutiClientIT from './OreMinutiClientIT'

export const metadata: Metadata = {
  title: 'Calcolatrice di Ore e Minuti - CalculaTodo.online',
  description: 'Calcola, somma e converti ore e minuti facilmente. Strumento gratuito per calcoli di tempo e durata.',
  keywords: 'calcolatrice ore, calcolatrice minuti, somma ore, conversione tempo, durata, calcolo tempo, italiano',
  openGraph: {
    title: 'Calcolatrice di Ore e Minuti - CalculaTodo.online',
    description: 'Calcola, somma e converti ore e minuti facilmente. Strumento gratuito per calcoli di tempo e durata.',
    type: 'website',
  },
}

export default function OreMinutiPage() {
  return <OreMinutiClientIT />
}
