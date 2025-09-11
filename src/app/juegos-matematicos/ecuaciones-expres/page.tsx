import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import EcuacionesExpresClient from './EcuacionesExpresClient'

export const metadata: Metadata = buildMeta({
  title: 'Ecuaciones Exprés - Juego de Matemáticas Avanzado',
  description: 'Resuelve ecuaciones de primer y segundo grado en tiempo limitado. Desafía tu agilidad algebraica con nuestro juego educativo avanzado.',
  keywords: ['ecuaciones', 'álgebra', 'primer grado', 'segundo grado', 'juego matemáticas', 'educativo avanzado']
})

export default function EcuacionesExpresPage() {
  return <EcuacionesExpresClient />
}
