import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ComparacionNumerosClient from './ComparacionNumerosClient'

export const metadata: Metadata = buildMeta({
  title: 'Comparación de Números - Juegos de Matemáticas',
  description: 'Compara números y determina cuál es mayor, menor o igual. ¡Desafía tu sentido numérico y agilidad mental!',
  keywords: ['comparación de números', 'mayor que', 'menor que', 'igual que', 'sentido numérico', 'agilidad mental', 'juegos de matemáticas']
})

export default function ComparacionNumerosPage() {
  return <ComparacionNumerosClient />
}
