import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizImprontaCarbonicaClientIT from './QuizImprontaCarbonicaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Quiz di Impronta di Carbonio - Sostenibilità ed Emissioni CO₂',
  description: 'Scopri come le tue azioni quotidiane impattano l\'ambiente. Impara sulle emissioni di CO₂, trasporto sostenibile e abitudini eco-friendly.',
  canonical: '/it/trivias/quiz-impronta-carbonica',
  keywords: ['impronta di carbonio', 'CO2', 'emissioni', 'sostenibilità', 'ambiente', 'trasporto', 'dieta', 'energia', 'quiz educativo']
})

export default function QuizImprontaCarbonicaPage() {
  return <QuizImprontaCarbonicaClientIT />
}
