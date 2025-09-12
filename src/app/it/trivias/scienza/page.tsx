import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviasScienzaClientIT from './TriviasScienzaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Quiz di Scienza - Quiz Educativi su Anatomia e Biologia',
  description: 'Quiz educativi su scienza, anatomia, biologia e altro. Impara sul corpo umano, ossa, organi e sistemi biologici.',
  canonical: '/it/trivias/scienza',
  keywords: ['quiz scienza', 'anatomia', 'biologia', 'corpo umano', 'ossa', 'organi', 'sistemi biologici', 'quiz educativo']
})

export default function TriviasScienzaPage() {
  return <TriviasScienzaClientIT />
}