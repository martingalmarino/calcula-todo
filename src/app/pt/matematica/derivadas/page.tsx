import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DerivadasClientPT from './DerivadasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de derivadas online gratuita. Calcular derivadas numéricas e analíticas de funções. Ferramenta matemática precisa.',
  autoTitle: true,
})

export default function DerivadasPage() {
  return <DerivadasClientPT />
}
