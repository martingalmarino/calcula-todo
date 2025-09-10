import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NumerosRomanosClientPT from './NumerosRomanosClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Conversor de números romanos online gratuito. Converte números arábicos para romanos e vice-versa. Ferramenta útil para estudantes e historiadores.',
  autoTitle: true,
})

export default function NumerosRomanosPage() {
  return <NumerosRomanosClientPT />
}
