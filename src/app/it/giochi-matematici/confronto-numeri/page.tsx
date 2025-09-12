import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConfrontoNumeriClientIT from './ConfrontoNumeriClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Confronto dei Numeri - Giochi Matematici',
  description: 'Confronta numeri e determina quale è maggiore, minore o uguale. Sfida il tuo senso numerico e agilità mentale!',
  keywords: ['confronto', 'numeri', 'maggiore', 'minore', 'uguale', 'senso numerico', 'agilità mentale', 'confrontare']
})

export default function ConfrontoNumeriPage() {
  return <ConfrontoNumeriClientIT />
}
