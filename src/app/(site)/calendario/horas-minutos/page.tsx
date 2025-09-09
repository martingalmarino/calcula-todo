import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import HorasMinutosClient from './HorasMinutosClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de horas y minutos online gratuita. Suma y resta horas y minutos con precisión. Herramienta de tiempo para cálculos de duración.',
  canonical: '/calendario/horas-minutos/',
  autoTitle: true,
})

export default function HorasMinutosPage() {
  return <HorasMinutosClient />
}
