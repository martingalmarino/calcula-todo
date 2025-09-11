import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SecuenciasClient from './SecuenciasClient'

export const metadata: Metadata = buildMeta({
  title: 'Secuencias Numéricas - Juego de Matemáticas',
  description: 'Juego educativo para completar secuencias numéricas y patrones matemáticos. Mejora tu lógica y razonamiento matemático.',
  keywords: ['juego matemáticas', 'secuencias', 'patrones', 'números', 'lógica matemática', 'educativo']
})

export default function SecuenciasPage() {
  return <SecuenciasClient />
}
