import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PuzzleGeometricoClientPT from './PuzzleGeometricoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Quebra-cabeça Geométrico Simples - Jogos Matemáticos',
  description: 'Calcule perímetros e áreas de figuras geométricas simples. Desafie seu conhecimento de geometria básica!',
  keywords: ['geometria', 'perímetro', 'área', 'retângulo', 'quadrado', 'triângulo', 'figuras geométricas']
})

export default function PuzzleGeometricoPage() {
  return <PuzzleGeometricoClientPT />
}
