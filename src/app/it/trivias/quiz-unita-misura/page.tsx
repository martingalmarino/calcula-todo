import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizUnitaMisuraClientIT from './QuizUnitaMisuraClientIT'

export async function generateMetadata(): Promise<Metadata> {
  return buildMeta({
    title: 'Quiz sulle unità di misura - Sistema Internazionale',
    description: 'Impara sul Sistema Internazionale di Unità e gli strumenti di misurazione. Scopri le unità base di lunghezza, massa, volume e altro.',
    canonical: '/it/trivias/quiz-unita-misura',
    keywords: ['unità di misura', 'sistema internazionale', 'SI', 'metro', 'chilogrammo', 'litro', 'strumenti scientifici', 'quiz'],
    h1Title: 'Quiz sulle unità di misura'
  })
}

export default function QuizUnitaMisuraPage() {
  return <QuizUnitaMisuraClientIT />
}
