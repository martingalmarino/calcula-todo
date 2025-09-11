import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import JuegosMatematicosClient from './JuegosMatematicosClient'

export const metadata: Metadata = buildMeta({
  title: 'Juegos de Inteligencia Matemática - Diviértete Aprendiendo',
  description: 'Juegos de matemáticas fáciles para niños y adultos. Sumas, restas, fracciones y más. Mejora tu agilidad mental con nuestros juegos educativos gratuitos.',
  keywords: ['juegos de matemáticas', 'juegos educativos', 'matemáticas fáciles', 'sumas y restas', 'fracciones', 'agilidad mental', 'juegos para niños']
})

export default function JuegosMatematicosPage() {
  return <JuegosMatematicosClient />
}
