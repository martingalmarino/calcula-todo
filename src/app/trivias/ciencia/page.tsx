import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviasCienciaClient from './TriviasCienciaClient'

export const metadata: Metadata = buildMeta({
  title: 'Trivias de Ciencia - Quiz Educativos sobre Anatomía y Biología',
  description: 'Trivias educativas sobre ciencia, anatomía, biología y más. Aprende sobre el cuerpo humano, huesos, órganos y sistemas biológicos.',
  keywords: ['trivias ciencia', 'anatomía', 'biología', 'cuerpo humano', 'huesos', 'órganos', 'sistemas biológicos', 'quiz educativo']
})

export default function TriviasCienciaPage() {
  return <TriviasCienciaClient />
}
