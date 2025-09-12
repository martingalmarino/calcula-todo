import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizImcAbitudiniClientIT from './QuizImcAbitudiniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Quiz di IMC e Abitudini Salutari - Metti alla Prova la Tua Conoscenza',
  description: 'Quiz educativo su IMC, salute corporea e abitudini salutari. Impara sul benessere mentre ti diverti con domande interattive.',
  keywords: ['quiz IMC', 'abitudini salutari', 'salute corporea', 'benessere', 'educazione salute', 'IMC normale']
})

export default function QuizImcAbitudiniPage() {
  return <QuizImcAbitudiniClientIT />
}