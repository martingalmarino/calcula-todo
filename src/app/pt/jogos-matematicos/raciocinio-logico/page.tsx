import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RaciocinioLogicoClientPT from './RaciocinioLogicoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Raciocínio Lógico com Padrões - Jogos Matemáticos',
  description: 'Descubra padrões matemáticos em sequências de símbolos e números. Desafie seu pensamento lógico e raciocínio abstrato!',
  keywords: ['padrões', 'lógica', 'sequências', 'raciocínio', 'símbolos', 'pensamento abstrato']
})

export default function RaciocinioLogicoPage() {
  return <RaciocinioLogicoClientPT />
}
