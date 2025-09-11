import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CirculoClientPT from './CirculoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área e Perímetro do Círculo',
  description: 'Calcula a área, perímetro, diâmetro e raio de um círculo com fórmulas precisas. Ferramenta gratuita e fácil de usar.',
  keywords: [
    'círculo',
    'área',
    'perímetro',
    'raio',
    'diâmetro',
    'circunferência',
    'geometria',
    'matemática'
  ]
})

export default function CirculoPage() {
  return <CirculoClientPT />
}
