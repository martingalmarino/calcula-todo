import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EquazioniExpressClientIT from './EquazioniExpressClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Equazioni Express - Giochi Matematici',
  description: 'Risolvi equazioni semplici in tempo limitato. Sfida la tua comprensione dell\'algebra di base!',
  keywords: ['equazioni', 'algebra', 'risolvere', 'matematica', 'velocità', 'comprensione', 'base']
})

export default function EquazioniExpressPage() {
  return <EquazioniExpressClientIT />
}
