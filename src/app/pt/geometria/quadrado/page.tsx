import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuadradoClientPT from './QuadradoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área e Perímetro do Quadrado',
  description: 'Calcula a área e perímetro de um quadrado conhecendo seu lado. Ferramenta gratuita e fácil de usar.',
  keywords: [
    'quadrado',
    'área',
    'perímetro',
    'lado',
    'figuras regulares',
    'geometria',
    'matemática'
  ]
})

export default function QuadradoPage() {
  return <QuadradoClientPT />
}
