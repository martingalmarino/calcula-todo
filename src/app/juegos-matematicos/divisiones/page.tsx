import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DivisionesClient from './DivisionesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora Mental de Divisiones - Juegos de Matemáticas',
  description: 'Practica divisiones mentales en tiempo limitado. ¡Desafía tu agilidad mental y mejora tu cálculo mental!',
  keywords: ['divisiones', 'cálculo mental', 'agilidad mental', 'matemáticas', 'práctica', 'velocidad', 'juegos de matemáticas']
})

export default function DivisionesPage() {
  return <DivisionesClient />
}
