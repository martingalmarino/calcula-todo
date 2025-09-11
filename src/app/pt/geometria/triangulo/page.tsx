import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrianguloClientPT from './TrianguloClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área do Triângulo',
  description: 'Calcula a área de um triângulo com base e altura ou usando a fórmula de Herón. Ferramenta gratuita e fácil de usar.',
  keywords: [
    'triângulo',
    'área',
    'base',
    'altura',
    'fórmula herón',
    'lados',
    'geometria',
    'matemática'
  ]
})

export default function TrianguloPage() {
  return <TrianguloClientPT />
}
