import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RectanguloClient from './RectanguloClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área y Perímetro del Rectángulo',
  description: 'Calcula el área y perímetro de un rectángulo conociendo sus dimensiones o viceversa. Herramienta gratuita para cálculos geométricos.',
  keywords: [
    'calculadora rectángulo',
    'área rectángulo',
    'perímetro rectángulo',
    'geometría',
    'matemáticas',
    'cálculo área',
    'fórmula rectángulo',
    'largo ancho'
  ]
})

export default function RectanguloPage() {
  return <RectanguloClient />
}
