import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizOssaCorpoUmanoClientIT from './QuizOssaCorpoUmanoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Quiz sulle ossa del corpo umano - Anatomia Ossea',
  description: 'Impara sull\'anatomia ossea del corpo umano. Scopri quanti ossa abbiamo, quali sono i più lunghi e piccoli, e le loro funzioni principali.',
  canonical: '/it/trivias/quiz-ossa-corpo-umano',
  keywords: ['ossa', 'anatomia', 'corpo umano', 'scheletro', 'femore', 'cranio', 'colonna vertebrale', 'biologia', 'quiz educativo']
})

export default function QuizOssaCorpoUmanoPage() {
  return <QuizOssaCorpoUmanoClientIT />
}
