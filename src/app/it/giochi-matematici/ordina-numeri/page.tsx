import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OrdinaNumeriClientIT from './OrdinaNumeriClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Ordina i Numeri - Giochi Matematici',
  description: 'Ordina numeri in sequenza crescente o decrescente in tempo limitato. Sfida la tua agilità mentale e senso numerico!',
  keywords: ['ordinare', 'numeri', 'sequenze', 'crescente', 'decrescente', 'agilità mentale', 'senso numerico', 'ordinamento']
})

export default function OrdinaNumeriPage() {
  return <OrdinaNumeriClientIT />
}
