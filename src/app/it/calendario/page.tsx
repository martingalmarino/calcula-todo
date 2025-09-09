import { Metadata } from 'next'
import CalendarioClientIT from './CalendarioClientIT'

export const metadata: Metadata = {
  title: 'Calculadoras de Calendario - CalculaTodo.online',
  description: 'Calculadoras de calendario en italiano: contatore di giorni tra date, calcolatrice dell\'età, aggiungi/sottrai giorni, ore e minuti, giorni di vacanza e convertitore di date.',
  keywords: 'calcolatrice calendario, contatore giorni, età, date, vacanze, ore minuti, italiano',
  openGraph: {
    title: 'Calculadoras de Calendario - CalculaTodo.online',
    description: 'Calculadoras de calendario en italiano: contatore di giorni tra date, calcolatrice dell\'età, aggiungi/sottrai giorni, ore e minuti, giorni di vacanza e convertitore di date.',
    type: 'website',
  },
}

export default function CalendarioPage() {
  return <CalendarioClientIT />
}
