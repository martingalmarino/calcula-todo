import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { GeometriaClient } from './GeometriaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Geometría – Áreas y Perímetros Online',
  description: 'Calculadoras geométricas para calcular áreas, perímetros y propiedades de figuras planas: círculos, rectángulos, triángulos, cuadrados, rombos y trapecios.',
  keywords: [
    'calculadoras geometría',
    'área círculo',
    'perímetro rectángulo',
    'área triángulo',
    'área cuadrado',
    'área rombo',
    'área trapecio',
    'figuras geométricas',
    'matemáticas',
    'geometría plana'
  ]
})

export default function GeometriaPage() {
  return <GeometriaClient />
}
