import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizImcHabitosClient from './QuizImcHabitosClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz de IMC y Hábitos Saludables - Pon a Prueba tu Conocimiento',
  description: 'Quiz educativo sobre IMC, salud corporal y hábitos saludables. Aprende sobre bienestar mientras te diviertes con preguntas interactivas.',
  keywords: ['quiz IMC', 'hábitos saludables', 'salud corporal', 'bienestar', 'educación salud', 'IMC normal']
})

export default function QuizImcHabitosPage() {
  return <QuizImcHabitosClient />
}
