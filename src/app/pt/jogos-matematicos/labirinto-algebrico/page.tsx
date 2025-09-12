import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LabirintoAlgebricoClientPT from './LabirintoAlgebricoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'O Labirinto Algébrico - Jogos Matemáticos',
  description: 'Navegue por um labirinto resolvendo operações algébricas em cada passo. Desafie sua agilidade matemática e pensamento estratégico!',
  keywords: ['labirinto', 'álgebra', 'operações', 'navegação', 'matemáticas', 'estratégia', 'pensamento lógico']
})

export default function LabirintoAlgebricoPage() {
  return <LabirintoAlgebricoClientPT />
}
