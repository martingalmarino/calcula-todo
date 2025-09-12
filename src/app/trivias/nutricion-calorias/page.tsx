import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NutricionCaloriasClient from './NutricionCaloriasClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('nutricion-calorias')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Trivia de Nutrición Básica - Calorías de Alimentos',
  description: triviaConfig?.description || 'Adivina las calorías de distintos alimentos y aprende sobre nutrición. Incluye comparaciones visuales y modo batalla.',
  keywords: triviaConfig?.keywords || ['nutrición', 'calorías', 'alimentos', 'dieta', 'salud', 'comparaciones', 'trivia educativa']
})

export default function NutricionCaloriasPage() {
  return <NutricionCaloriasClient />
}
