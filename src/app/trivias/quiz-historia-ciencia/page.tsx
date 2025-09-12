import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizHistoriaCienciaClient from './QuizHistoriaCienciaClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz de Historia de la Ciencia',
  description: 'Conoce a los grandes científicos y sus descubrimientos que cambiaron el mundo. Desde Copérnico hasta Einstein, explora la evolución del pensamiento científico.',
  keywords: [
    'historia ciencia',
    'Copérnico',
    'Newton',
    'Darwin',
    'Galileo',
    'Marie Curie',
    'Fleming',
    'Einstein',
    'Mendeleiev',
    'Gutenberg',
    'Pasteur',
    'quiz ciencia',
    'trivia científicos'
  ]
})

export default function QuizHistoriaCienciaPage() {
  return <QuizHistoriaCienciaClient />
}
