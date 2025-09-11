import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LaberintoAlgebraicoClient from './LaberintoAlgebraicoClient'

export const metadata: Metadata = buildMeta({
  title: 'El Laberinto Algebraico - Matemáticas Avanzadas',
  description: 'Navega por un laberinto resolviendo operaciones algebraicas en cada paso. Desafía tu agilidad matemática y pensamiento estratégico.',
  keywords: ['laberinto', 'álgebra', 'operaciones', 'navegación', 'matemáticas', 'estrategia', 'pensamiento lógico']
})

export default function LaberintoAlgebraicoPage() {
  return <LaberintoAlgebraicoClient />
}
