import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FinancasClientPT from './FinancasClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Finanças - Juros Simples, Financiamentos, Depreciação e Mais',
  description: 'Calculadoras financeiras online gratuitas: juros simples, financiamentos, depreciação de veículos, IPCA, poupança objetivo, valor futuro e presente. Ferramentas financeiras precisas.',
  keywords: [
    'calculadoras financeiras',
    'juros simples',
    'financiamentos',
    'depreciação veículos',
    'IPCA',
    'poupança objetivo',
    'valor futuro',
    'valor presente',
    'finanças online',
    'calculadoras econômicas'
  ]
})

export default function FinancasPage() {
  return <FinancasClientPT />
}
