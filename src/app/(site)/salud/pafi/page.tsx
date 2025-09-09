import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PaFiClient from './PaFiClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora PaFi online gratuita. Evalúa la relación entre presión arterial y frecuencia cardíaca. Herramienta médica para monitoreo cardiovascular.',
  autoTitle: true,
})

export default function PaFiPage() {
  return <PaFiClient />
}
