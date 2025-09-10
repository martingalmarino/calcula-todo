import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FinanzeClientIT from './FinanzeClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrici di Finanze - Interesse Semplice, Mutui, Deprezzamento e Più',
  description: 'Calcolatrici finanziarie online gratuite: interesse semplice, mutui, deprezzamento veicoli, IPC, risparmio obiettivo, valore futuro e presente. Strumenti finanziari precisi.',
  keywords: [
    'calcolatrici finanziarie',
    'interesse semplice',
    'mutui',
    'deprezzamento veicoli',
    'IPC',
    'risparmio obiettivo',
    'valore futuro',
    'valore presente',
    'finanze online',
    'calcolatrici economiche'
  ]
})

export default function FinanzePageIT() {
  return <FinanzeClientIT />
}
