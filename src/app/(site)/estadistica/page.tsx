import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EstadisticaClient from './EstadisticaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Estadística - Análisis de Datos y Probabilidades',
  description: 'Calculadoras estadísticas gratuitas para análisis de datos, medidas de tendencia central, dispersión y probabilidades. Media, mediana, moda, varianza y más.',
  keywords: ['estadística', 'análisis de datos', 'media', 'mediana', 'moda', 'varianza', 'probabilidad', 'tendencia central', 'dispersión'],
  canonical: '/estadistica/'
})

export default function EstadisticaPage() {
  return <EstadisticaClient />
}
