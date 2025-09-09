import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Fracciones - Operaciones con Fracciones Online',
  description: 'Simplifica, convierte, suma, resta, multiplica y divide fracciones. Resultados con explicación paso a paso.',
  keywords: ['fracciones', 'simplificar', 'sumar', 'restar', 'multiplicar', 'dividir', 'decimal', 'fracción']
})

export default function FraccionesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
