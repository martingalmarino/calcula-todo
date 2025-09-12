import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SudokuOperacoesClientPT from './SudokuOperacoesClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Sudoku de Operações Matemáticas - Jogos Matemáticos',
  description: 'Resolva grades onde cada linha e coluna deve somar o mesmo resultado. Desafie sua lógica matemática!',
  keywords: ['sudoku', 'operações', 'grade', 'lógica matemática', 'somas']
})

export default function SudokuOperacoesPage() {
  return <SudokuOperacoesClientPT />
}
