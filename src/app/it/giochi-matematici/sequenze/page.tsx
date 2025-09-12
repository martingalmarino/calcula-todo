import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SequenzeClientIT from './SequenzeClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Sequenze Numeriche - Giochi Matematici',
  description: 'Completa sequenze numeriche e trova il pattern. Sfida la tua logica e capacità di riconoscimento dei pattern!',
  keywords: ['sequenze', 'numeriche', 'pattern', 'logica', 'completare', 'riconoscimento', 'sequenza']
})

export default function SequenzePage() {
  return <SequenzeClientIT />
}
