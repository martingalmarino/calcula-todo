import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SudokuOperacionesClient from './SudokuOperacionesClient'

export const metadata: Metadata = buildMeta({
  title: 'Sudoku de Operaciones Matemáticas - Juego de Matemáticas',
  description: 'Juego educativo de sudoku con operaciones matemáticas. Resuelve grillas donde cada fila y columna debe sumar el mismo resultado.',
  keywords: ['juego matemáticas', 'sudoku', 'operaciones', 'grilla', 'lógica matemática', 'educativo']
})

export default function SudokuOperacionesPage() {
  return <SudokuOperacionesClient />
}
