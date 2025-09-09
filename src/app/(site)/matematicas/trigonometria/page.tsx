import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrigonometriaClient from './TrigonometriaClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de trigonometría online para calcular seno, coseno, tangente, funciones inversas, teorema de Pitágoras y catetos. Gratis y fácil de usar.',
  autoTitle: true,
})

export default function TrigonometriaPage() {
  return <TrigonometriaClient />
}