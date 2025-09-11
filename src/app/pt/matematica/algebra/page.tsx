import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AlgebraClientPT from './AlgebraClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de álgebra online gratuita. Resolver equações lineares, quadráticas e sistemas de equações. Ferramenta matemática precisa.',
  autoTitle: true,
})

export default function AlgebraPage() {
  return <AlgebraClientPT />
}
