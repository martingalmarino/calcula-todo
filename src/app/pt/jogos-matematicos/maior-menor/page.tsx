import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MaiorMenorClientPT from './MaiorMenorClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Maior ou Menor - Jogos Matemáticos',
  description: 'Compare números rapidamente e escolha qual é maior ou menor. Desafie sua agilidade mental e senso numérico!',
  keywords: ['maior', 'menor', 'comparação', 'números', 'agilidade mental', 'senso numérico']
})

export default function MaiorMenorPage() {
  return <MaiorMenorClientPT />
}
