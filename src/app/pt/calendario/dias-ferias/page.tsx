import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DiasFeriasClientPT from './DiasFeriasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de dias de férias online gratuita. Calcula os dias de férias entre duas datas, separando dias úteis e fins de semana.',
  autoTitle: true,
})

export default function DiasFeriasPage() {
  return <DiasFeriasClientPT />
}
