import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OrdenaNumerosClientPT from './OrdenaNumerosClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Ordene os Números - Jogos Matemáticos',
  description: 'Ordene números em sequência crescente ou decrescente rapidamente. Desafie sua agilidade mental e senso numérico!',
  keywords: ['ordenação', 'números', 'sequência', 'crescente', 'decrescente', 'agilidade mental']
})

export default function OrdenaNumerosPage() {
  return <OrdenaNumerosClientPT />
}
