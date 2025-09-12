import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NutrizioneCalorieClientIT from './NutrizioneCalorieClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('nutrizione-calorie')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Trivia di Nutrizione Básica - Calorie di Alimenti',
  description: triviaConfig?.description || 'Indovina le calorie di diversi alimenti e impara sulla nutrizione. Include confronti visivi e modalità battaglia.',
  keywords: triviaConfig?.keywords || ['nutrizione', 'calorie', 'alimenti', 'dieta', 'salute', 'confronti', 'trivia educativa']
})

export default function NutrizioneCaloriePage() {
  return <NutrizioneCalorieClientIT />
}