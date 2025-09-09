import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrianguloClient from './TrianguloClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área del Triángulo',
  description: 'Calcula el área de un triángulo conociendo base y altura o los tres lados. Herramienta gratuita para cálculos geométricos.',
  keywords: [
    'calculadora triángulo',
    'área triángulo',
    'geometría',
    'matemáticas',
    'cálculo área',
    'fórmula triángulo',
    'fórmula herón'
  ]
})

export default function TrianguloPage() {
  return <TrianguloClient />
}
