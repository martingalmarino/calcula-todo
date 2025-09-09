import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DiasVacacionesClient from './DiasVacacionesClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de días de vacaciones online gratuita. Calcula días laborables excluyendo fines de semana. Herramienta para planificar vacaciones y días libres.',
  canonical: '/calendario/dias-vacaciones/',
  autoTitle: true,
})

export default function DiasVacacionesPage() {
  return <DiasVacacionesClient />
}
