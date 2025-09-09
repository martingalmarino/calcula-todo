import { Metadata } from 'next'
import CalcolatriceEtaClientIT from './CalcolatriceEtaClientIT'

export const metadata: Metadata = {
  title: 'Calcolatrice dell\'Età - CalculaTodo.online',
  description: 'Calcola la tua età esatta in anni, mesi e giorni dalla tua data di nascita. Strumento gratuito per calcolare l\'età precisa.',
  keywords: 'calcolatrice età, calcolo età, età esatta, data nascita, anni mesi giorni, italiano',
  openGraph: {
    title: 'Calcolatrice dell\'Età - CalculaTodo.online',
    description: 'Calcola la tua età esatta in anni, mesi e giorni dalla tua data di nascita. Strumento gratuito per calcolare l\'età precisa.',
    type: 'website',
  },
}

export default function CalcolatriceEtaPage() {
  return <CalcolatriceEtaClientIT />
}
