import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import PesoIdealClientPT from './PesoIdealClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Peso Ideal - Descubra seu peso ideal | CalculaTudo.online',
  description: 'Calcule seu peso ideal baseado na fórmula de Devine. Descubra qual é o peso recomendado para sua altura e sexo.',
  keywords: ['peso ideal', 'calculadora peso', 'fórmula Devine', 'peso recomendado', 'altura']
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Peso Ideal', href: '/pt/saude/peso-ideal/' }
]

export default function PesoIdealPage() {
  return <PesoIdealClientPT />
}
