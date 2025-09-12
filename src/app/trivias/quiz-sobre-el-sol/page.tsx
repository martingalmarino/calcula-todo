import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getTriviaById } from '@/lib/trivias-config'
import QuizSobreElSolClient from './QuizSobreElSolClient'

export async function generateMetadata(): Promise<Metadata> {
  const trivia = getTriviaById('quiz-sobre-el-sol')
  
  if (!trivia) {
    return buildMeta({
      title: 'Trivia sobre el Sol',
      description: 'Descubre los secretos de nuestra estrella más cercana. Aprende sobre la composición, temperatura, actividad solar y fenómenos que afectan la Tierra.',
      canonical: '/trivias/quiz-sobre-el-sol'
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

export default function QuizSobreElSolPage() {
  return <QuizSobreElSolClient />
}
