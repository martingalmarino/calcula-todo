import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AdivinaColorHexRgbClient from './AdivinaColorHexRgbClient'
import { getTriviaById } from '@/lib/trivias-config'

const triviaConfig = getTriviaById('adivina-color-hex-rgb')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Adivina el Color (HEX ↔ RGB) - Conversión de Colores',
  description: triviaConfig?.description || 'Pon a prueba tus conocimientos sobre códigos de color. Aprende a convertir entre códigos hexadecimales (HEX) y valores RGB de forma divertida.',
  keywords: triviaConfig?.keywords || ['colores', 'hex', 'rgb', 'conversión', 'códigos', 'diseño', 'web', 'paleta', 'trivia educativa']
})

export default function AdivinaColorHexRgbPage() {
  return <AdivinaColorHexRgbClient />
}
