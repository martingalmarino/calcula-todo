import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SommeSottrazioniClientIT from './SommeSottrazioniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Somme e Sottrazioni - Giochi Matematici',
  description: 'Pratica somme e sottrazioni contro il tempo. Sfida la tua agilità mentale e migliora il calcolo mentale!',
  keywords: ['somme', 'sottrazioni', 'calcolo mentale', 'agilità mentale', 'matematica', 'pratica', 'velocità', 'addizione']
})

export default function SommeSottrazioniPage() {
  return <SommeSottrazioniClientIT />
}
