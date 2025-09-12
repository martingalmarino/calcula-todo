import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizHuellaCarbonoClient from './QuizHuellaCarbonoClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('quiz-huella-carbono')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz de Huella de Carbono - Sostenibilidad y Emisiones CO₂',
  description: triviaConfig?.description || 'Descubre cómo tus acciones diarias impactan el medio ambiente. Aprende sobre emisiones de CO₂, transporte sostenible y hábitos eco-friendly.',
  keywords: triviaConfig?.keywords || ['huella de carbono', 'CO2', 'emisiones', 'sostenibilidad', 'medio ambiente', 'transporte', 'dieta', 'energía', 'quiz educativo']
})

export default function QuizHuellaCarbonoPage() {
  return <QuizHuellaCarbonoClient />
}
