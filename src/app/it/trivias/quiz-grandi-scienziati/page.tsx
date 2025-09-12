import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'
import QuizGrandiScienziatiClientIT from './QuizGrandiScienziatiClientIT'

export async function generateMetadata(): Promise<Metadata> {
  const trivia = getTriviaByIdIT('quiz-grandi-scienziati')
  
  if (!trivia) {
    return buildMeta({
      title: 'Quiz di grandi scienziati',
      description: 'Scopri gli scienziati più importanti della storia e i loro contributi alla scienza.',
      canonical: '/it/trivias/quiz-grandi-scienziati'
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

export default function QuizGrandiScienziatiPage() {
  return <QuizGrandiScienziatiClientIT />
}
