import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Porcentajes - Calcular % Online Gratis',
  description: 'Calcula porcentajes, descuentos, aumentos y variaciones porcentuales. Resultados con explicación paso a paso.',
  keywords: ['porcentajes', 'descuentos', 'aumentos', 'variación', 'proporción', 'calcular porcentaje']
})

export default function PorcentajesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
