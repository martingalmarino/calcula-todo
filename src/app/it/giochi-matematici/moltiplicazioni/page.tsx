import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MoltiplicazioniClientIT from './MoltiplicazioniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Mentale delle Moltiplicazioni - Giochi Matematici',
  description: 'Pratica moltiplicazioni di 2-3 cifre in tempo limitato. Sfida la tua agilità mentale e migliora il calcolo mentale!',
  keywords: ['moltiplicazioni', 'calcolo mentale', 'agilità mentale', 'matematica', 'pratica', 'velocità', 'moltiplicare']
})

export default function MoltiplicazioniPage() {
  return <MoltiplicazioniClientIT />
}
