import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuizPaleontologiaDinosauriosClient from './QuizPaleontologiaDinosauriosClient'

export const metadata: Metadata = buildMeta({
  title: 'Quiz de Paleontología y Dinosaurios - Trivia Científica',
  description: 'Explora el fascinante mundo de los dinosaurios y la paleontología. Aprende sobre las eras geológicas, fósiles y las criaturas que dominaron la Tierra durante millones de años.',
  keywords: [
    'dinosaurios',
    'paleontología',
    'fósiles',
    'Tyrannosaurus',
    'Triceratops',
    'Stegosaurus',
    'Cretácico',
    'Jurásico',
    'Triásico',
    'extinción',
    'asteroide',
    'quiz científico',
    'trivia educativa'
  ]
})

export default function QuizPaleontologiaDinosauriosPage() {
  return <QuizPaleontologiaDinosauriosClient />
}
