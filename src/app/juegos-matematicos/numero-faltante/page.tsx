import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NumeroFaltanteClient from './NumeroFaltanteClient'

export const metadata: Metadata = buildMeta({
  title: 'Encuentra el Número Faltante - Juego de Matemáticas',
  description: 'Juego educativo para encontrar el número que falta en ecuaciones matemáticas. Mejora tu agilidad mental con operaciones de suma y resta.',
  keywords: ['juego matemáticas', 'número faltante', 'ecuaciones', 'agilidad mental', 'educativo']
})

export default function NumeroFaltantePage() {
  return <NumeroFaltanteClient />
}
