import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getTriviaById } from '@/lib/trivias-config'
import QuizUnidadesMedidaClient from './QuizUnidadesMedidaClient'

export async function generateMetadata(): Promise<Metadata> {
  const trivia = getTriviaById('quiz-unidades-medida')
  
  if (!trivia) {
    return buildMeta({
      title: 'Quiz sobre unidades de medida',
      description: 'Aprende sobre el Sistema Internacional de Unidades y los instrumentos de medición.',
      canonical: '/trivias/quiz-unidades-medida'
    })
  }

  return buildMeta({
    title: trivia.title,
    description: trivia.description,
    canonical: trivia.href,
    keywords: trivia.keywords,
    h1Title: trivia.title
  })
}

export default function QuizUnidadesMedidaPage() {
  return <QuizUnidadesMedidaClient />
}
