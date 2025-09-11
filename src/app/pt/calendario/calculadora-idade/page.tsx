import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalculadoraIdadeClientPT from './CalculadoraIdadeClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de idade online gratuita. Calcula sua idade exata em anos, meses e dias desde sua data de nascimento. Ferramenta de calendário precisa.',
  autoTitle: true,
})

export default function CalculadoraIdadePage() {
  return <CalculadoraIdadeClientPT />
}
