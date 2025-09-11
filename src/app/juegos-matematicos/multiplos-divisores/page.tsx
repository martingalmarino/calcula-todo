import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MultiplosDivisoresClient from './MultiplosDivisoresClient'

export const metadata: Metadata = buildMeta({
  title: 'Desafío de Múltiplos y Divisores - Juego de Matemáticas',
  description: 'Juego educativo para identificar rápidamente múltiplos y divisores. Mejora tu agilidad mental con números y operaciones matemáticas.',
  keywords: ['juego matemáticas', 'múltiplos', 'divisores', 'números', 'agilidad mental', 'educativo']
})

export default function MultiplosDivisoresPage() {
  return <MultiplosDivisoresClient />
}
