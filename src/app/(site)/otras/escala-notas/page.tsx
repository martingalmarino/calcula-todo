import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EscalaNotasClient from './EscalaNotasClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de escala de notas online gratuita. Convierte puntuaciones numéricas a escala de letras A, B, C, D, F. Herramienta educativa precisa.',
  canonical: '/otras/escala-notas/',
  autoTitle: true,
})

export default function EscalaNotasPage() {
  return <EscalaNotasClient />
}
