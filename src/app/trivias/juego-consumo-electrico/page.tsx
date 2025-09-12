import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import JuegoConsumoElectricoClient from './JuegoConsumoElectricoClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('juego-consumo-electrico')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Juego de Consumo Eléctrico - Eficiencia Energética en el Hogar',
  description: triviaConfig?.description || 'Aprende sobre eficiencia energética y consumo eléctrico en el hogar. Descubre qué electrodomésticos gastan más energía y cómo ahorrar en tu factura.',
  keywords: triviaConfig?.keywords || ['consumo eléctrico', 'eficiencia energética', 'electrodomésticos', 'ahorro energético', 'factura de luz', 'sostenibilidad', 'energía', 'juego educativo']
})

export default function JuegoConsumoElectricoPage() {
  return <JuegoConsumoElectricoClient />
}
