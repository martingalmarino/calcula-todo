import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DormirSuficienteClient from './DormirSuficienteClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('dormir-suficiente')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || '¿Dormís lo suficiente? - Quiz de Hábitos de Sueño',
  description: triviaConfig?.description || 'Pon a prueba tus conocimientos sobre el sueño y los hábitos saludables. Aprende cuántas horas necesitas dormir según tu edad.',
  keywords: triviaConfig?.keywords || ['sueño', 'dormir', 'hábitos saludables', 'insomnio', 'salud mental', 'descanso', 'trivia educativa']
})

export default function DormirSuficientePage() {
  return <DormirSuficienteClient />
}
