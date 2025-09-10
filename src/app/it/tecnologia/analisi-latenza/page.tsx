import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AnalisiLatenzaClientIT from './AnalisiLatenzaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Analisi della Latenza - Calcola Ping e Latenza di Rete',
  description: 'Calcola e analizza la latenza di rete per ottimizzare le prestazioni. Calcolatrice gratuita per ping e latenza di connessione.',
  keywords: [
    'latenza',
    'ping',
    'rete',
    'prestazioni',
    'calcolatrice latenza',
    'analisi rete',
    'tempo risposta'
  ]
})

export default function AnalisiLatenzaPageIT() {
  return <AnalisiLatenzaClientIT />
}
