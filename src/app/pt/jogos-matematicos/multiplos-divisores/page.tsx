import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MultiplosDivisoresClientPT from './MultiplosDivisoresClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Desafio de Múltiplos e Divisores - Jogos Matemáticos',
  description: 'Identifique múltiplos e divisores rapidamente. Filtre números por suas propriedades!',
  keywords: ['múltiplos', 'divisores', 'números', 'propriedades', 'filtrado']
})

export default function MultiplosDivisoresPage() {
  return <MultiplosDivisoresClientPT />
}
