import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrapecioClient from './TrapecioClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área del Trapecio',
  description: 'Calcula el área de un trapecio conociendo sus bases y altura o viceversa. Herramienta gratuita para cálculos geométricos.',
  keywords: [
    'calculadora trapecio',
    'área trapecio',
    'geometría',
    'matemáticas',
    'cálculo área',
    'fórmula trapecio',
    'bases altura'
  ]
})

export default function TrapecioPage() {
  return <TrapecioClient />
}
