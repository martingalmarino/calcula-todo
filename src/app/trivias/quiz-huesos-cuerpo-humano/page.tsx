import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizHuesosCuerpoHumanoClient from './QuizHuesosCuerpoHumanoClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('quiz-huesos-cuerpo-humano')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz sobre los huesos del cuerpo humano - Anatomía Ósea',
  description: triviaConfig?.description || 'Aprende sobre la anatomía ósea del cuerpo humano. Descubre cuántos huesos tenemos, cuáles son los más largos y pequeños, y sus funciones principales.',
  keywords: triviaConfig?.keywords || ['huesos', 'anatomía', 'cuerpo humano', 'esqueleto', 'fémur', 'cráneo', 'columna vertebral', 'biología', 'quiz educativo']
})

export default function QuizHuesosCuerpoHumanoPage() {
  return <QuizHuesosCuerpoHumanoClient />
}
