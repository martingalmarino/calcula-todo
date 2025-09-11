import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RompecabezasGeometricoClient from './RompecabezasGeometricoClient'

export const metadata: Metadata = buildMeta({
  title: 'Rompecabezas Geométrico Simple - Juegos de Matemáticas',
  description: 'Calcula perímetros y áreas de figuras geométricas simples. ¡Desafía tu conocimiento de geometría básica con rectángulos, cuadrados y triángulos!',
  keywords: ['geometría', 'perímetro', 'área', 'rectángulo', 'cuadrado', 'triángulo', 'figuras geométricas', 'matemáticas visuales'],
  canonical: '/juegos-matematicos/rompecabezas-geometrico'
})

export default function RompecabezasGeometricoPage() {
  return <RompecabezasGeometricoClient />
}
