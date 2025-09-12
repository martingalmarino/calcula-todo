import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MediaAritmeticaClient from './MediaAritmeticaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Media Aritmética - Promedio de Números',
  description: 'Calcula la media aritmética (promedio) de una lista de números. Ingresa tus datos y obtén el resultado con la fórmula aplicada paso a paso.',
  keywords: ['media aritmética', 'promedio', 'estadística', 'tendencia central', 'fórmula', 'cálculo'],
  canonical: '/estadistica/media-aritmetica/'
})

export default function MediaAritmeticaPage() {
  return <MediaAritmeticaClient />
}
