import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizEcologiaEcosistemasClient from './QuizEcologiaEcosistemasClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz de Ecología y Ecosistemas - Trivia Científica',
  description: 'Aprende sobre los ecosistemas, cadenas alimentarias, biodiversidad y el equilibrio ecológico. Descubre cómo interactúan los seres vivos con su entorno.',
  keywords: [
    'ecología',
    'ecosistemas',
    'biodiversidad',
    'cadena alimentaria',
    'productores',
    'consumidores',
    'biomas',
    'sabana',
    'selva tropical',
    'capa de ozono',
    'energía solar',
    'quiz científico',
    'trivia educativa'
  ]
})

export default function QuizEcologiaEcosistemasPage() {
  return <QuizEcologiaEcosistemasClient />
}
