import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CuadradoClient from './CuadradoClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área y Perímetro del Cuadrado',
  description: 'Calcula el área y perímetro de un cuadrado conociendo su lado o viceversa. Herramienta gratuita para cálculos geométricos.',
  keywords: [
    'calculadora cuadrado',
    'área cuadrado',
    'perímetro cuadrado',
    'geometría',
    'matemáticas',
    'cálculo área',
    'fórmula cuadrado'
  ]
})

export default function CuadradoPage() {
  return <CuadradoClient />
}
