import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import CaloriasClientPT from './CaloriasClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Calorias - Necessidades Calóricas Diárias | CalculaTudo.online',
  description: 'Calcule suas necessidades calóricas diárias baseadas em peso, altura, idade, sexo e nível de atividade física.',
  keywords: ['calorias', 'necessidades calóricas', 'TMB', 'metabolismo', 'dieta', 'atividade física']
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Calorias', href: '/pt/saude/calorias/' }
]

export default function CaloriasPage() {
  return <CaloriasClientPT />
}
