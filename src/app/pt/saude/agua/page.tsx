import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AguaClientPT from './AguaClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Água - Ingestão Diária Recomendada | CalculaTudo.online',
  description: 'Calcule sua ingestão diária recomendada de água baseada em peso, idade e nível de atividade física.',
  keywords: ['água', 'hidratação', 'ingestão diária', 'saúde', 'líquidos']
})

export default function AguaPage() {
  return <AguaClientPT />
}