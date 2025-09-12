import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FrazioniClientIT from './FrazioniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Puzzle delle Frazioni - Giochi Matematici',
  description: 'Risolvi puzzle visivi con frazioni. Sfida la tua comprensione delle frazioni e migliora le tue abilità matematiche!',
  keywords: ['frazioni', 'puzzle', 'visivo', 'comprensione', 'matematica', 'risolvere', 'abilità']
})

export default function FrazioniPage() {
  return <FrazioniClientIT />
}
