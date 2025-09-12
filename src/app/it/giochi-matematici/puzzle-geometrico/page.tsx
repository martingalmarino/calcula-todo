import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PuzzleGeometricoClientIT from './PuzzleGeometricoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Puzzle Geometrico - Giochi Matematici',
  description: 'Risolvi puzzle geometrici e problemi di forme. Sfida la tua comprensione della geometria!',
  keywords: ['puzzle', 'geometrico', 'forme', 'geometria', 'comprensione', 'problemi', 'sfida']
})

export default function PuzzleGeometricoPage() {
  return <PuzzleGeometricoClientIT />
}
