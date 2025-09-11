import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DiasEntreDatasClientPT from './DiasEntreDatasClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de dias entre datas online gratuita. Calcula a diferença exata em dias, semanas, meses e anos entre duas datas específicas.',
  autoTitle: true,
})

export default function DiasEntreDatasPage() {
  return <DiasEntreDatasClientPT />
}
