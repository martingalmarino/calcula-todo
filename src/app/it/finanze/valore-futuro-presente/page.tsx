import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ValoreFuturoPresenteClientIT from './ValoreFuturoPresenteClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Valore Futuro e Presente - Calcolo Investimenti e Sconto',
  description: 'Calcola il valore futuro degli investimenti e il valore presente di somme future. Strumento gratuito per analizzare il valore del denaro nel tempo.',
  keywords: [
    'valore futuro',
    'valore presente',
    'calcolo investimenti',
    'sconto finanziario',
    'valore denaro tempo',
    'calcolatrice finanziaria'
  ]
})

export default function ValoreFuturoPresentePageIT() {
  return <ValoreFuturoPresenteClientIT />
}
