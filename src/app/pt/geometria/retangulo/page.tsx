import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RetanguloClientPT from './RetanguloClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área e Perímetro do Retângulo',
  description: 'Calcula a área e perímetro de um retângulo conhecendo suas dimensões. Ferramenta gratuita e fácil de usar.',
  keywords: [
    'retângulo',
    'área',
    'perímetro',
    'comprimento',
    'largura',
    'dimensões',
    'geometria',
    'matemática'
  ]
})

export default function RetanguloPage() {
  return <RetanguloClientPT />
}
