import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizEstadosMateriaClient from './QuizEstadosMateriaClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz sobre Estados de la Materia',
  description: 'Sumérgete en el mundo de la física y descubre los diferentes estados de la materia. Aprende sobre sólidos, líquidos, gases, plasma y los procesos de cambio de estado.',
  keywords: [
    'estados materia',
    'sólido',
    'líquido', 
    'gas',
    'plasma',
    'sublimación',
    'condensación',
    'fusión',
    'evaporación',
    'cristal',
    'hielo seco',
    'quiz ciencia',
    'trivia física'
  ]
})

export default function QuizEstadosMateriaPage() {
  return <QuizEstadosMateriaClient />
}
