import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SonoClientPT from './SonoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Sono - Ciclos de Sono Ideais | CalculaTudo.online',
  description: 'Calcule seus ciclos de sono e descubra os melhores horários para dormir e acordar.',
  keywords: ['sono', 'ciclos de sono', 'horário dormir', 'horário acordar', 'qualidade sono']
})

export default function SonoPage() {
  return <SonoClientPT />
}