import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FracoesClientPT from './FracoesClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Quebra-cabeça de Frações - Jogos Matemáticos',
  description: 'Identifique frações visuais com pizzas divididas. Aprenda frações de forma visual!',
  keywords: ['frações', 'visual', 'pizzas', 'matemáticas visuais']
})

export default function FracoesPage() {
  return <FracoesClientPT />
}
