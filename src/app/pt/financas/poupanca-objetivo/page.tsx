import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PoupancaObjetivoClientPT from './PoupancaObjetivoClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de poupança objetivo online gratuita. Calcule quanto poupar mensalmente para alcançar uma meta financeira. Ferramenta financeira precisa.',
  autoTitle: true,
})

export default function PoupancaObjetivoPage() {
  return <PoupancaObjetivoClientPT />
}
