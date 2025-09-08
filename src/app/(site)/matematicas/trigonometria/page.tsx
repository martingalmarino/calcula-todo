import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrigonometriaClient from './TrigonometriaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Trigonometría – Seno, coseno, tangente y funciones inversas',
  description: 'Calculadora de trigonometría online para calcular seno, coseno, tangente, funciones inversas, teorema de Pitágoras y catetos. Gratis y fácil de usar.',
  canonical: '/matematicas/trigonometria/',
})

export default function TrigonometriaPage() {
  return <TrigonometriaClient />
}