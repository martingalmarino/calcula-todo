import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PatronesLogicosClient from './PatronesLogicosClient'

export const metadata: Metadata = buildMeta({
  title: 'Razonamiento Lógico con Patrones - Matemáticas Avanzadas',
  description: 'Descubre patrones matemáticos en secuencias de símbolos y números. Desafía tu pensamiento lógico y razonamiento abstracto.',
  keywords: ['patrones', 'lógica', 'secuencias', 'razonamiento', 'matemáticas', 'símbolos', 'pensamiento abstracto']
})

export default function PatronesLogicosPage() {
  return <PatronesLogicosClient />
}
