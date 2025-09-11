import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalculadoraIPCAClientPT from './CalculadoraIPCAClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora do IPCA online gratuita. Calcule o impacto da inflação no poder de compra do dinheiro. Ferramenta financeira precisa.',
  autoTitle: true,
})

export default function CalculadoraIPCAPage() {
  return <CalculadoraIPCAClientPT />
}
