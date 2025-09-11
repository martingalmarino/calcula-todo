import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FraccionesClient from './FraccionesClient'

export const metadata: Metadata = buildMeta({
  title: 'Rompecabezas de Fracciones Visuales - Juego de Matemáticas',
  description: 'Juego educativo para aprender fracciones visualmente. Selecciona la pizza que representa la fracción correcta.',
  keywords: ['juego matemáticas', 'fracciones', 'visual', 'pizza', 'educativo', 'aprendizaje']
})

export default function FraccionesPage() {
  return <FraccionesClient />
}
