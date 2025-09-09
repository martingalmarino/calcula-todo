import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FrazioniClientIT from './FrazioniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice di Frazioni - Operazioni con Frazioni Online',
  description: 'Calcola operazioni con frazioni online: semplifica, somma, sottrai, moltiplica e dividi frazioni. Risultati precisi con spiegazioni dettagliate.',
  keywords: [
    'calcolatrice frazioni',
    'operazioni frazioni',
    'semplifica frazioni',
    'somma frazioni',
    'moltiplica frazioni',
    'dividi frazioni',
    'frazioni online',
    'matematica'
  ]
})

export default function FrazioniPageIT() {
  return <FrazioniClientIT />
}
