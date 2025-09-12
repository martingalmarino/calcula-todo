import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MemoriaMatematicaClient from './MemoriaMatematicaClient'

export const metadata: Metadata = buildMeta({
  title: 'Memoria Matemática - Juegos de Matemáticas',
  description: 'Recuerda secuencias de operaciones matemáticas y repítelas correctamente. ¡Desafía tu memoria y concentración!',
  keywords: ['memoria matemática', 'secuencias', 'operaciones', 'concentración', 'memoria', 'juegos de matemáticas', 'entrenamiento mental']
})

export default function MemoriaMatematicaPage() {
  return <MemoriaMatematicaClient />
}
