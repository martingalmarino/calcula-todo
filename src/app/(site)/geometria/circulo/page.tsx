import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CirculoClient from './CirculoClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área y Perímetro del Círculo',
  description: 'Calcula el área, perímetro, diámetro y radio de un círculo con fórmulas precisas. Herramienta gratuita para cálculos geométricos.',
  keywords: [
    'calculadora círculo',
    'área círculo',
    'perímetro círculo',
    'radio círculo',
    'diámetro círculo',
    'geometría',
    'matemáticas',
    'cálculo área',
    'fórmula círculo'
  ]
})

export default function CirculoPage() {
  return <CirculoClient />
}
