import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LabirintoAlgebricoClientIT from './LabirintoAlgebricoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Il Labirinto Algebrico - Giochi Matematici',
  description: 'Naviga attraverso un labirinto risolvendo equazioni algebriche. Sfida la tua comprensione dell\'algebra!',
  keywords: ['labirinto', 'algebrico', 'equazioni', 'algebra', 'navigare', 'comprensione', 'sfida']
})

export default function LabirintoAlgebricoPage() {
  return <LabirintoAlgebricoClientIT />
}
