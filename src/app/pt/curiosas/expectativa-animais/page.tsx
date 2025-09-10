import { Metadata } from 'next'
import { ExpectativaAnimaisClientPT } from './ExpectativaAnimaisClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Expectativa de Animais - Calculadoras Online',
  description: 'Compare sua idade com a expectativa de vida de diferentes animais. Descubra quantas vidas de outros animais você já viveu.',
  keywords: ['expectativa vida animal', 'idade animal', 'tartaruga idade', 'colibri idade', 'mosca idade']
})

export default function ExpectativaAnimaisPage() {
  return <ExpectativaAnimaisClientPT />
}
