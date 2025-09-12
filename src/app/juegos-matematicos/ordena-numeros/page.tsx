import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OrdenaNumerosClient from './OrdenaNumerosClient'

export const metadata: Metadata = buildMeta({
  title: 'Ordena los Números - Juegos de Matemáticas',
  description: 'Ordena números en secuencia ascendente o descendente en tiempo limitado. ¡Desafía tu agilidad mental y sentido numérico!',
  keywords: ['ordenar números', 'secuencias', 'ascendente', 'descendente', 'agilidad mental', 'sentido numérico', 'juegos de matemáticas']
})

export default function OrdenaNumerosPage() {
  return <OrdenaNumerosClient />
}
