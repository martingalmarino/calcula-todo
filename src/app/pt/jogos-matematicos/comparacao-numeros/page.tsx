import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ComparacaoNumerosClientPT from './ComparacaoNumerosClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Comparação de Números - Jogos Matemáticos',
  description: 'Compare números e determine qual é maior, menor ou igual. Desafie seu senso numérico e agilidade mental!',
  keywords: ['comparação de números', 'maior que', 'menor que', 'igual que', 'senso numérico', 'agilidade mental']
})

export default function ComparacaoNumerosPage() {
  return <ComparacaoNumerosClientPT />
}
