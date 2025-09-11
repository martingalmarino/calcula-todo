import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SumasRestasClient from './SumasRestasClient'

export const metadata: Metadata = buildMeta({
  title: 'Sumas y Restas contra Reloj - Juego de Matemáticas',
  description: 'Juego de sumas y restas contra reloj. Resuelve operaciones matemáticas en 30 segundos y demuestra tu velocidad mental. ¡Perfecto para niños y adultos!',
  keywords: ['sumas y restas', 'juego matemáticas', 'cálculo mental', 'velocidad', 'agilidad mental', 'juegos educativos']
})

export default function SumasRestasPage() {
  return <SumasRestasClient />
}
