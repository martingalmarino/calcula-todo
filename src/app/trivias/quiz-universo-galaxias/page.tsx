import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizUniversoGalaxiasClient from './QuizUniversoGalaxiasClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz del Universo y Galaxias',
  description: 'Explora los misterios del cosmos, desde el Big Bang hasta las galaxias distantes. Descubre los secretos del universo, la Vía Láctea y los fenómenos astronómicos más fascinantes.',
  keywords: [
    'universo',
    'galaxias', 
    'Big Bang',
    'Vía Láctea',
    'agujero negro',
    'año luz',
    'materia oscura',
    'Hubble',
    'Andrómeda',
    'espiral',
    'supermasivo',
    'quiz ciencia',
    'trivia astronomía'
  ]
})

export default function QuizUniversoGalaxiasPage() {
  return <QuizUniversoGalaxiasClient />
}
