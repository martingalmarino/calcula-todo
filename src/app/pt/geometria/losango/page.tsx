import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LosangoClientPT from './LosangoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área e Perímetro do Losango',
  description: 'Calcula a área e perímetro de um losango conhecendo suas diagonais ou lado e diagonal. Ferramenta gratuita e fácil de usar.',
  keywords: [
    'losango',
    'área',
    'perímetro',
    'diagonais',
    'lado',
    'paralelogramo',
    'geometria',
    'matemática'
  ]
})

export default function LosangoPage() {
  return <LosangoClientPT />
}
