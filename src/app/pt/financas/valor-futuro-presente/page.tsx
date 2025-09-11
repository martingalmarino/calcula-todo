import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ValorFuturoPresenteClientPT from './ValorFuturoPresenteClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de valor futuro e presente online gratuita. Calcule valor futuro e presente de investimentos com juros compostos. Ferramenta financeira precisa.',
  autoTitle: true,
})

export default function ValorFuturoPresentePage() {
  return <ValorFuturoPresenteClientPT />
}
