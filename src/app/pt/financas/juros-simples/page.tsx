import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import JurosSimplesClientPT from './JurosSimplesClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de juros simples online gratuita. Calcule juros simples para empréstimos curtos, descontos e dívidas básicas. Ferramenta financeira precisa.',
  autoTitle: true,
})

export default function JurosSimplesPage() {
  return <JurosSimplesClientPT />
}
