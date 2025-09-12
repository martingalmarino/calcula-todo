import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizExploracionEspacialClient from './QuizExploracionEspacialClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz de Exploración Espacial',
  description: 'Viaja a través de la historia de la exploración espacial. Desde Yuri Gagarin hasta las misiones modernas, descubre los hitos más importantes de la conquista del espacio.',
  keywords: [
    'exploración espacial',
    'Yuri Gagarin',
    'Apollo 11',
    'Hubble',
    'ISS',
    'Voyager',
    'Curiosity',
    'Marte',
    'Valentina Tereshkova',
    'Sputnik',
    'James Webb',
    'quiz ciencia',
    'trivia espacio'
  ]
})

export default function QuizExploracionEspacialPage() {
  return <QuizExploracionEspacialClient />
}
