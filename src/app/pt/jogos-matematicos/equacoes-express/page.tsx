import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EquacoesExpressClientPT from './EquacoesExpressClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Equações Express - Jogos Matemáticos',
  description: 'Resolva equações de primeiro e segundo grau em tempo limitado. Desafie sua agilidade algébrica!',
  keywords: ['equações', 'álgebra', 'primeiro grau', 'segundo grau', 'avançado']
})

export default function EquacoesExpressPage() {
  return <EquacoesExpressClientPT />
}
