import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizCrisisFinancierasClient from './QuizCrisisFinancierasClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('quiz-crisis-financieras')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz de Crisis Financieras - Historia Económica Mundial',
  description: triviaConfig?.description || 'Aprende sobre las crisis financieras más importantes de la historia. Descubre qué causó cada crisis, cuándo ocurrieron y sus consecuencias globales.',
  keywords: triviaConfig?.keywords || ['crisis financieras', 'historia económica', 'Gran Depresión', 'crisis 2008', 'economía mundial', 'burbujas financieras', 'recesiones', 'quiz educativo']
})

export default function QuizCrisisFinancierasPage() {
  return <QuizCrisisFinancierasClient />
}
