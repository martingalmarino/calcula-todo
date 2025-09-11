import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GeometriaClientPT from './GeometriaClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Geometria - Área e Perímetro',
  description: 'Calculadoras geométricas para calcular áreas, perímetros e propriedades de figuras planas como círculos, retângulos, triângulos, quadrados, losangos e trapézios.',
  keywords: [
    'geometria',
    'área',
    'perímetro',
    'círculo',
    'retângulo',
    'triângulo',
    'quadrado',
    'losango',
    'trapézio',
    'figuras planas',
    'matemática'
  ]
})

export default function GeometriaPage() {
  return <GeometriaClientPT />
}
