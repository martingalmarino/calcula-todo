import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import IMCClientPT from './IMCClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de IMC - Índice de Massa Corporal | CalculaTudo.online',
  description: 'Calcule seu Índice de Massa Corporal (IMC) gratuitamente. Descubra sua categoria de peso e receba recomendações personalizadas para uma vida saudável.',
  keywords: ['calculadora IMC', 'índice massa corporal', 'peso ideal', 'categoria peso', 'saúde']
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'IMC', href: '/pt/saude/imc/' }
]

export default function IMCPage() {
  return <IMCClientPT />
}
