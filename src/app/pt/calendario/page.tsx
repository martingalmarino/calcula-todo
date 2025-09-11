import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalendarioClientPT from './CalendarioClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Calendário - Datas, Idade, Horas e Férias',
  description: 'Calculadoras de calendário online gratuitas: dias entre datas, calculadora de idade, somar/subtrair dias, horas e minutos, dias de férias. Ferramentas de tempo e datas.',
  keywords: [
    'calculadoras calendário',
    'dias entre datas',
    'calculadora idade',
    'somar subtrair dias',
    'horas minutos',
    'dias férias',
    'calculadoras tempo',
    'ferramentas datas'
  ]
})

export default function CalendarioPage() {
  return <CalendarioClientPT />
}
