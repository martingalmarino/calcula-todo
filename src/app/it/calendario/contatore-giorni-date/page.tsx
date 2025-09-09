import { Metadata } from 'next'
import ContatoreGiorniDateClientIT from './ContatoreGiorniDateClientIT'

export const metadata: Metadata = {
  title: 'Contatore di Giorni tra Date - CalculaTodo.online',
  description: 'Calcola la differenza esatta in giorni, settimane, mesi e anni tra due date qualsiasi. Strumento gratuito per contare giorni tra date.',
  keywords: 'contatore giorni, calcolo date, differenza date, giorni tra date, calcolatrice calendario, italiano',
  openGraph: {
    title: 'Contatore di Giorni tra Date - CalculaTodo.online',
    description: 'Calcola la differenza esatta in giorni, settimane, mesi e anni tra due date qualsiasi. Strumento gratuito per contare giorni tra date.',
    type: 'website',
  },
}

export default function ContatoreGiorniDatePage() {
  return <ContatoreGiorniDateClientIT />
}
