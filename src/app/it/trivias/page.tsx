import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviasClientIT from './TriviasClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Trivias e Quiz Educativi - Metti alla Prova le Tue Conoscenze',
  description: 'Trivias educative su salute, matematica, finanza e altro. Impara divertendoti con i nostri quiz interattivi gratuiti.',
  keywords: ['trivias educative', 'quiz interattivi', 'conoscenza', 'apprendimento', 'educazione', 'salute', 'matematica']
})

export default function TriviasPageIT() {
  return <TriviasClientIT />
}
