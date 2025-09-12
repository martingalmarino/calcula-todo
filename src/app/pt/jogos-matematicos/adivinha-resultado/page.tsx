import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AdivinhaResultadoClientPT from './AdivinhaResultadoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Adivinhe o Resultado - Jogos Matemáticos',
  description: 'Observe operações passo a passo e adivinhe o resultado final. Desafie sua capacidade de acompanhamento matemático!',
  keywords: ['adivinhe resultado', 'operações passo a passo', 'acompanhamento matemático', 'cálculo mental']
})

export default function AdivinhaResultadoPage() {
  return <AdivinhaResultadoClientPT />
}
