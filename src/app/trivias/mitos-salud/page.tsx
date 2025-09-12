import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MitosSaludClient from './MitosSaludClient'

export const metadata: Metadata = buildMeta({
  title: 'Juego de Mitos de Salud - Desmiente Creencias Comunes',
  description: 'Pon a prueba tus conocimientos sobre mitos de salud. Desmiente creencias comunes de forma lúdica y aprende la verdad sobre nutrición y bienestar.',
  keywords: ['mitos salud', 'creencias salud', 'verdadero falso', 'nutrición', 'bienestar', 'desmentir mitos', 'salud']
})

export default function MitosSaludPage() {
  return <MitosSaludClient />
}
