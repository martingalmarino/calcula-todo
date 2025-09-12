import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ModaClient from './ModaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Moda - Valor Más Repetido',
  description: 'Identifica la moda (valor que más se repite) en un conjunto de datos. Útil para análisis de encuestas y frecuencias.',
  keywords: ['moda', 'valor más repetido', 'frecuencia', 'estadística', 'tendencia central', 'encuestas'],
  canonical: '/estadistica/moda/'
})

export default function ModaPage() {
  return <ModaClient />
}
