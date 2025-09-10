import { Metadata } from 'next'
import CervejaFestaClientPT from './CervejaFestaClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Cerveja e Festa - Calculadoras Online',
  description: 'Calcule quanta cerveja você precisa para sua festa. Descubra a quantidade ideal baseada no número de convidados e duração.',
  keywords: ['cerveja festa', 'quantidade cerveja', 'festa convidados', 'cálculo cerveja', 'planejamento festa']
})

export default function CervejaFestaPage() {
  return <CervejaFestaClientPT />
}
