import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MaggioreMinoreClientIT from './MaggioreMinoreClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Maggiore o Minore - Giochi Matematici',
  description: 'Confronta numeri e determina quale è maggiore o minore. Sfida il tuo senso numerico e agilità mentale!',
  keywords: ['maggiore', 'minore', 'confronto', 'numeri', 'senso numerico', 'agilità mentale', 'confrontare']
})

export default function MaggioreMinorePage() {
  return <MaggioreMinoreClientIT />
}
