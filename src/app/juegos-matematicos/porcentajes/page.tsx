import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PorcentajesClient from './PorcentajesClient'

export const metadata: Metadata = buildMeta({
  title: 'Rompecabezas de Porcentajes - Juego de Matemáticas',
  description: 'Juego educativo para calcular porcentajes, descuentos y aumentos. Mejora tu agilidad mental con cálculos de porcentajes en situaciones reales.',
  keywords: ['juego matemáticas', 'porcentajes', 'descuentos', 'aumentos', 'cálculos', 'agilidad mental', 'educativo']
})

export default function PorcentajesPage() {
  return <PorcentajesClient />
}
