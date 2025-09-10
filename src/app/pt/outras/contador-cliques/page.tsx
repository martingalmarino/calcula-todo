import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContadorCliquesClientPT from './ContadorCliquesClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Contador de cliques (CPS) online gratuito. Teste sua velocidade de cliques por segundo. Ferramenta útil para gamers e testes de coordenação.',
  autoTitle: true,
})

export default function ContadorCliquesPage() {
  return <ContadorCliquesClientPT />
}
