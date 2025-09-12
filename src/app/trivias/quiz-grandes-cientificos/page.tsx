import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getTriviaById } from '@/lib/trivias-config'
import QuizGrandesCientificosClient from './QuizGrandesCientificosClient'

export async function generateMetadata(): Promise<Metadata> {
  const trivia = getTriviaById('quiz-grandes-cientificos')
  
  if (!trivia) {
    return buildMeta({
      title: 'Quiz de grandes científicos',
      description: 'Descubre los científicos más importantes de la historia y sus contribuciones a la ciencia.',
      canonical: '/trivias/quiz-grandes-cientificos'
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

export default function QuizGrandesCientificosPage() {
  return <QuizGrandesCientificosClient />
}
