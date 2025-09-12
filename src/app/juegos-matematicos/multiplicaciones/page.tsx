import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MultiplicacionesClient from './MultiplicacionesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora Mental de Multiplicaciones - Juegos de Matemáticas',
  description: 'Practica multiplicaciones de 2-3 dígitos en tiempo limitado. ¡Desafía tu agilidad mental y mejora tu cálculo mental!',
  keywords: ['multiplicaciones', 'cálculo mental', 'agilidad mental', 'matemáticas', 'práctica', 'velocidad', 'juegos de matemáticas']
})

export default function MultiplicacionesPage() {
  return <MultiplicacionesClient />
}
