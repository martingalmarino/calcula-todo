import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContatoreParoleCaratteriClientIT from './ContatoreParoleCaratteriClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Contatore di Parole e Caratteri - Analisi Testo Online',
  description: 'Conta parole, caratteri, frasi e paragrafi nel tuo testo. Calcolatrice gratuita per analisi di testo con tempo di lettura stimato.',
  keywords: [
    'contatore parole',
    'contatore caratteri',
    'analisi testo',
    'conteggio parole',
    'tempo lettura',
    'calcolatrice testo'
  ]
})

export default function ContatoreParoleCaratteriPageIT() {
  return <ContatoreParoleCaratteriClientIT />
}
