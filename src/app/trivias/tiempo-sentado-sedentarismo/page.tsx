import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TiempoSentadoSedentarismoClient from './TiempoSentadoSedentarismoClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('tiempo-sentado-sedentarismo')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || '¿Cuánto tiempo pasás sentado? (Sedentarismo) - Quiz de Estilo de Vida',
  description: triviaConfig?.description || 'Descubre los riesgos del sedentarismo y aprende cómo combatir los efectos de estar sentado demasiado tiempo. Conoce las recomendaciones para un estilo de vida más activo.',
  keywords: triviaConfig?.keywords || ['sedentarismo', 'tiempo sentado', 'salud', 'pausas activas', 'estilo de vida', 'trabajo', 'oficina', 'trivia educativa']
})

export default function TiempoSentadoSedentarismoPage() {
  return <TiempoSentadoSedentarismoClient />
}
