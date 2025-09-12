import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizSulSoleClientIT from './QuizSulSoleClientIT'

export async function generateMetadata(): Promise<Metadata> {
  return buildMeta({
    title: 'Quiz sul Sole - Scopri i segreti della nostra stella',
    description: 'Scopri i segreti della nostra stella più vicina. Impara sulla composizione, temperatura, attività solare e fenomeni che influenzano la Terra.',
    canonical: '/it/trivias/quiz-sul-sole',
    keywords: ['sole', 'stella', 'astronomia', 'fusione nucleare', 'sistema solare', 'quiz', 'educativo'],
    h1Title: 'Quiz sul Sole'
  })
}

export default function QuizSulSolePage() {
  return <QuizSulSoleClientIT />
}
