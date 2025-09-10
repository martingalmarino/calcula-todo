import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { SaudeClientPT } from './SaudeClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Saúde - CalculaTudo.online',
  description: 'Calculadoras de saúde gratuitas: IMC, peso ideal, calorias, água, sono e exercício. Ferramentas precisas para cuidar da sua saúde.',
  keywords: ['calculadora saúde', 'IMC', 'peso ideal', 'calorias', 'água', 'sono', 'exercício', 'saúde']
})

export default function SaudePage() {
  return <SaudeClientPT />
}
