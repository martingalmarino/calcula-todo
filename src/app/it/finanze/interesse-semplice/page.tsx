import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import InteresseSempliceClientIT from './InteresseSempliceClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Interesse Semplice - Calcolo Interesse Prestiti Brevi',
  description: 'Calcola l\'interesse semplice per prestiti brevi, sconti per pagamento anticipato e operazioni finanziarie di base. Strumento gratuito e preciso.',
  keywords: [
    'interesse semplice',
    'calcolo interesse',
    'prestiti brevi',
    'sconto pagamento anticipato',
    'finanze',
    'calcolatrice finanziaria'
  ]
})

export default function InteresseSemplicePageIT() {
  return <InteresseSempliceClientIT />
}
