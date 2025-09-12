import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NumeroMancanteClientIT from './NumeroMancanteClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Trova il Numero Mancante - Giochi Matematici',
  description: 'Trova il numero mancante nelle sequenze matematiche. Sfida la tua logica e capacità di ragionamento!',
  keywords: ['numero mancante', 'sequenze', 'logica', 'ragionamento', 'pattern', 'matematica', 'indovinare']
})

export default function NumeroMancantePage() {
  return <NumeroMancanteClientIT />
}
