import { Metadata } from 'next'
import GiorniVacanzaClientIT from './GiorniVacanzaClientIT'

export const metadata: Metadata = {
  title: 'Giorni di Vacanza - CalculaTodo.online',
  description: 'Calcola i giorni di vacanza e ferie lavorative. Strumento gratuito per pianificare le tue vacanze.',
  keywords: 'giorni vacanza, ferie, giorni lavorativi, calcolo vacanze, pianificazione vacanze, italiano',
  openGraph: {
    title: 'Giorni di Vacanza - CalculaTodo.online',
    description: 'Calcola i giorni di vacanza e ferie lavorative. Strumento gratuito per pianificare le tue vacanze.',
    type: 'website',
  },
}

export default function GiorniVacanzaPage() {
  return <GiorniVacanzaClientIT />
}
