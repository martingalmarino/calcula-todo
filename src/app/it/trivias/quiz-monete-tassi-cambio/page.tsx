import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizMoneteTassiCambioClientIT from './QuizMoneteTassiCambioClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Quiz di Monete e Tassi di Cambio - Geografia Monetaria',
  description: 'Impara sulle monete ufficiali di diversi paesi del mondo. Scopri quali paesi usano quali monete e espandi le tue conoscenze geografiche.',
  canonical: '/it/trivias/quiz-monete-tassi-cambio',
  keywords: ['monete', 'tassi di cambio', 'geografia', 'paesi', 'economia', 'valute', 'finanze internazionali', 'quiz educativo']
})

export default function QuizMoneteTassiCambioPage() {
  return <QuizMoneteTassiCambioClientIT />
}
