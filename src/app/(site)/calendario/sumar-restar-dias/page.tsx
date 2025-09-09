import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SumarRestarDiasClient from './SumarRestarDiasClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora para sumar y restar días a una fecha online gratuita. Añade o quita días a cualquier fecha y obtén el resultado exacto. Herramienta de calendario.',
  canonical: '/calendario/sumar-restar-dias/',
  autoTitle: true,
})

export default function SumarRestarDiasPage() {
  return <SumarRestarDiasClient />
}
