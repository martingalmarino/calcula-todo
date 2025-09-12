import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PariDispariClientIT from './PariDispariClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Pari o Dispari Express - Giochi Matematici',
  description: 'Identifica rapidamente se i numeri sono pari o dispari. Sfida la tua velocità di riconoscimento numerico!',
  keywords: ['pari', 'dispari', 'numeri', 'velocità', 'riconoscimento', 'identificare', 'rapido']
})

export default function PariDispariPage() {
  return <PariDispariClientIT />
}
