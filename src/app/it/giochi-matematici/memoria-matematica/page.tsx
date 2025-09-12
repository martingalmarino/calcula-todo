import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MemoriaMatematicaClientIT from './MemoriaMatematicaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Memoria Matematica - Giochi Matematici',
  description: 'Ricorda sequenze di operazioni matematiche e ripetile correttamente. Sfida la tua memoria e concentrazione!',
  keywords: ['memoria', 'matematica', 'sequenze', 'operazioni', 'concentrazione', 'memoria', 'allenamento mentale', 'ricordare']
})

export default function MemoriaMatematicaPage() {
  return <MemoriaMatematicaClientIT />
}
