import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviaReciclajeContenedoresClient from './TriviaReciclajeContenedoresClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('trivia-reciclaje-contenedores')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Trivia de Reciclaje: ¿Qué va en cada contenedor? - Clasificación de Residuos',
  description: triviaConfig?.description || 'Aprende sobre la correcta clasificación de residuos y reciclaje. Descubre qué va en cada contenedor para cuidar el medio ambiente.',
  keywords: triviaConfig?.keywords || ['reciclaje', 'residuos', 'contenedores', 'medio ambiente', 'sostenibilidad', 'ecología', 'separación', 'trivia educativa']
})

export default function TriviaReciclajeContenedoresPage() {
  return <TriviaReciclajeContenedoresClient />
}
