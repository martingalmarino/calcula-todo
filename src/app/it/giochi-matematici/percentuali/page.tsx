import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PercentualiClientIT from './PercentualiClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Puzzle delle Percentuali - Giochi Matematici',
  description: 'Risolvi puzzle con percentuali e calcoli percentuali. Sfida la tua comprensione delle percentuali!',
  keywords: ['percentuali', 'puzzle', 'calcoli', 'comprensione', 'risolvere', 'matematica', 'percentuale']
})

export default function PercentualiPage() {
  return <PercentualiClientIT />
}
