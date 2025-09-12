import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SequenciasClientPT from './SequenciasClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Sequências Numéricas - Jogos Matemáticos',
  description: 'Descubra o padrão e complete a sequência. Desenvolva seu pensamento lógico!',
  keywords: ['sequências', 'padrões', 'lógica', 'progressões', 'séries']
})

export default function SequenciasPage() {
  return <SequenciasClientPT />
}
