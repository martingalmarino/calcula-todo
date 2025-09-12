import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SudokuOperazioniClientIT from './SudokuOperazioniClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Sudoku delle Operazioni - Giochi Matematici',
  description: 'Risolvi sudoku matematici con operazioni. Sfida la tua logica e capacità di risoluzione dei problemi!',
  keywords: ['sudoku', 'operazioni', 'logica', 'risoluzione problemi', 'matematica', 'puzzle', 'sfida']
})

export default function SudokuOperazioniPage() {
  return <SudokuOperazioniClientIT />
}
