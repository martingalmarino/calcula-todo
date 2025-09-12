import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PercentuaisClientPT from './PercentuaisClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Quebra-cabeça de Porcentagens - Jogos Matemáticos',
  description: 'Calcule descontos e aumentos com porcentagens. Domine os cálculos comerciais!',
  keywords: ['porcentagens', 'descontos', 'aumentos', 'cálculos comerciais']
})

export default function PercentuaisPage() {
  return <PercentuaisClientPT />
}
