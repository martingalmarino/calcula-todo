import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import VarianzaDesviacionClient from './VarianzaDesviacionClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Varianza y Desviación Estándar - Medidas de Dispersión',
  description: 'Calcula varianza y desviación estándar para población o muestra. Mide la dispersión de los datos respecto a la media.',
  keywords: ['varianza', 'desviación estándar', 'dispersión', 'población', 'muestra', 'estadística', 'medidas'],
  canonical: '/estadistica/varianza-desviacion/'
})

export default function VarianzaDesviacionPage() {
  return <VarianzaDesviacionClient />
}
