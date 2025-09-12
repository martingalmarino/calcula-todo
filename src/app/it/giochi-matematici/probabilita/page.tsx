import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ProbabilitaClientIT from './ProbabilitaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Gioco di Probabilità - Giochi Matematici',
  description: 'Risolvi problemi di probabilità e calcoli probabilistici. Sfida la tua comprensione della probabilità!',
  keywords: ['probabilità', 'calcoli', 'probabilistici', 'comprensione', 'matematica', 'statistica', 'calcolo']
})

export default function ProbabilitaPage() {
  return <ProbabilitaClientIT />
}
