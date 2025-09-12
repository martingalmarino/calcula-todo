import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizCrisiFinanziarieClientIT from './QuizCrisiFinanziarieClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('quiz-crisi-finanziarie')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz di Crisi Finanziarie - Storia Economica Mondiale',
  description: triviaConfig?.description || 'Impara sulle crisi finanziarie più importanti della storia. Scopri cosa ha causato ogni crisi, quando sono avvenute e le loro conseguenze globali.',
  keywords: triviaConfig?.keywords || ['crisi finanziarie', 'storia economica', 'Grande Depressione', 'crisi 2008', 'economia mondiale', 'bolle finanziarie', 'recessioni', 'quiz educativo']
})

export default function QuizCrisiFinanziariePage() {
  return <QuizCrisiFinanziarieClientIT />
}
