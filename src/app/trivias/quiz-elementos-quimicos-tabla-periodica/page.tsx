import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizElementosQuimicosTablaPeriodicaClient from './QuizElementosQuimicosTablaPeriodicaClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz de Elementos Químicos y Tabla Periódica - Trivia Científica',
  description: 'Sumérgete en el mundo de la química y la tabla periódica. Descubre los elementos, sus símbolos, propiedades y la organización de la tabla periódica moderna.',
  keywords: [
    'elementos químicos',
    'tabla periódica',
    'química',
    'hidrógeno',
    'oro',
    'helio',
    'sodio',
    'mercurio',
    'carbono',
    'Mendeleiev',
    'gases nobles',
    'quiz científico',
    'trivia educativa'
  ]
})

export default function QuizElementosQuimicosTablaPeriodicaPage() {
  return <QuizElementosQuimicosTablaPeriodicaClient />
}
