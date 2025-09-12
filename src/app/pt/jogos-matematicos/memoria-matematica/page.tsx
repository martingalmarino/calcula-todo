import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MemoriaMatematicaClientPT from './MemoriaMatematicaClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Memória Matemática - Jogos Matemáticos',
  description: 'Memorize operações matemáticas e seus resultados. Desafie sua memória e agilidade mental!',
  keywords: ['memória', 'matemática', 'operações', 'agilidade mental', 'concentração']
})

export default function MemoriaMatematicaPage() {
  return <MemoriaMatematicaClientPT />
}
