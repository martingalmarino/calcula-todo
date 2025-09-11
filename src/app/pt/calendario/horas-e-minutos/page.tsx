import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import HorasMinutosClientPT from './HorasMinutosClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de horas e minutos online gratuita. Calcula e converte entre horas e minutos, soma e subtrai tempos.',
  autoTitle: true,
})

export default function HorasMinutosPage() {
  return <HorasMinutosClientPT />
}
