import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MayorMenorClient from './MayorMenorClient'

export const metadata: Metadata = buildMeta({
  title: 'Mayor o Menor - Comparación de Números',
  description: 'Compara números rápidamente y elige cuál es mayor o menor. Desafía tu agilidad mental y sentido numérico.',
  keywords: ['mayor', 'menor', 'comparación', 'números', 'agilidad mental', 'sentido numérico', 'decimales', 'fracciones']
})

export default function MayorMenorPage() {
  return <MayorMenorClient />
}
