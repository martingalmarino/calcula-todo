import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OtrasClient from './OtrasClient'

export const metadata: Metadata = buildMeta({
  title: 'Otras Calculadoras - Escala de Notas, Gasolina, Palabras, Romanos y Clicks',
  description: 'Calculadoras útiles online: escala de notas, gasto de gasolina, contador de palabras, conversor de números romanos y contador de clicks. Herramientas prácticas gratuitas.',
  keywords: [
    'otras calculadoras',
    'escala de notas',
    'gasto gasolina',
    'contador palabras',
    'números romanos',
    'contador clicks',
    'CPS test',
    'calculadoras útiles',
    'herramientas online'
  ]
})

export default function OtrasPage() {
  return <OtrasClient />
}
