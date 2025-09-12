import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EjercicioFisicoOmsClient from './EjercicioFisicoOmsClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('ejercicio-fisico-oms')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Ejercicio Físico Mínimo Recomendado (OMS) - Quiz de Actividad Física',
  description: triviaConfig?.description || 'Aprende las recomendaciones oficiales de la OMS sobre actividad física. Descubre cuánto ejercicio necesitas para mantenerte saludable.',
  keywords: triviaConfig?.keywords || ['ejercicio', 'actividad física', 'OMS', 'salud', 'deporte', 'fitness', 'recomendaciones', 'trivia educativa']
})

export default function EjercicioFisicoOmsPage() {
  return <EjercicioFisicoOmsClient />
}
