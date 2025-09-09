import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContadorPalabrasClient from './ContadorPalabrasClient'

export const metadata: Metadata = buildMeta({
  description: 'Contador de palabras y caracteres online gratuito. Cuenta palabras, caracteres, oraciones, párrafos y tiempo de lectura. Herramienta para escritores y estudiantes.',
  autoTitle: true,
})

export default function ContadorPalabrasPage() {
  return <ContadorPalabrasClient />
}
