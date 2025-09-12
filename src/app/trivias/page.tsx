import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TriviasClient from './TriviasClient'

export const metadata: Metadata = buildMeta({
  title: 'Trivias y Quiz Educativos - Pon a Prueba tu Conocimiento',
  description: 'Trivias educativas sobre salud, matemáticas, finanzas y más. Aprende mientras te diviertes con nuestros quiz interactivos gratuitos.',
  keywords: ['trivias educativas', 'quiz interactivos', 'conocimiento', 'aprendizaje', 'educación', 'salud', 'matemáticas']
})

export default function TriviasPage() {
  return <TriviasClient />
}
