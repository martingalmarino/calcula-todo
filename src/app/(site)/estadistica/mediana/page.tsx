import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MedianaClient from './MedianaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Mediana - Valor Central de Datos',
  description: 'Calcula la mediana de un conjunto de valores. Encuentra el valor central después de ordenar los datos automáticamente.',
  keywords: ['mediana', 'valor central', 'estadística', 'tendencia central', 'ordenamiento', 'datos'],
  canonical: '/estadistica/mediana/'
})

export default function MedianaPage() {
  return <MedianaClient />
}
