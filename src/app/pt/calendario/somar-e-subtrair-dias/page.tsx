import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SomarSubtrairDiasClientPT from './SomarSubtrairDiasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de somar e subtrair dias online gratuita. Soma ou subtrai dias a uma data específica, mostrando o resultado e o dia da semana.',
  autoTitle: true,
})

export default function SomarSubtrairDiasPage() {
  return <SomarSubtrairDiasClientPT />
}
