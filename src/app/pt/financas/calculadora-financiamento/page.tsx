import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalculadoraFinanciamentoClientPT from './CalculadoraFinanciamentoClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de financiamento online gratuita. Calcule financiamentos com desdobramento mensal de capital e juros. Ferramenta financeira precisa.',
  autoTitle: true,
})

export default function CalculadoraFinanciamentoPage() {
  return <CalculadoraFinanciamentoClientPT />
}
