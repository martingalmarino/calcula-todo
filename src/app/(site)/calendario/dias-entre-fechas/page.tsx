import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DiasEntreFechasClient from './DiasEntreFechasClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de días entre fechas online gratuita. Calcula la diferencia exacta en días, semanas, meses y años entre dos fechas. Herramienta de calendario precisa.',
  canonical: '/calendario/dias-entre-fechas/',
  autoTitle: true,
})

export default function DiasEntreFechasPage() {
  return <DiasEntreFechasClient />
}
