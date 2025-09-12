import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizMonedasTiposCambioClient from './QuizMonedasTiposCambioClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('quiz-monedas-tipos-cambio')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz de Monedas y Tipos de Cambio - Geografía Monetaria',
  description: triviaConfig?.description || 'Aprende sobre las monedas oficiales de diferentes países del mundo. Descubre qué países usan qué monedas y expande tu conocimiento geográfico.',
  keywords: triviaConfig?.keywords || ['monedas', 'tipos de cambio', 'geografía', 'países', 'economía', 'divisas', 'finanzas internacionales', 'quiz educativo']
})

export default function QuizMonedasTiposCambioPage() {
  return <QuizMonedasTiposCambioClient />
}
