import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DivisioniClientIT from './DivisioniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Mentale delle Divisioni - Giochi Matematici',
  description: 'Pratica divisioni mentali in tempo limitato. Sfida la tua agilità mentale e migliora il calcolo mentale!',
  keywords: ['divisioni', 'calcolo mentale', 'agilità mentale', 'matematica', 'pratica', 'velocità', 'dividere']
})

export default function DivisioniPage() {
  return <DivisioniClientIT />
}
