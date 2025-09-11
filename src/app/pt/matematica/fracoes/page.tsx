import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FracoesClientPT from './FracoesClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de frações online gratuita. Simplificar, converter, somar, subtrair, multiplicar e dividir frações. Ferramenta matemática precisa.',
  autoTitle: true,
})

export default function FracoesPage() {
  return <FracoesClientPT />
}
