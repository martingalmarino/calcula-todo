import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PercentuaisClientPT from './PercentuaisClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de percentuais online gratuita. Calcular percentuais, descontos, aumentos e variações percentuais. Ferramenta matemática precisa.',
  autoTitle: true,
})

export default function PercentuaisPage() {
  return <PercentuaisClientPT />
}
