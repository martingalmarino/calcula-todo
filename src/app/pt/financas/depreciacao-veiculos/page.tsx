import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DepreciacaoVeiculosClientPT from './DepreciacaoVeiculosClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de depreciação de veículos online gratuita. Calcule a depreciação de veículos usando métodos padrão do mercado. Ferramenta financeira precisa.',
  autoTitle: true,
})

export default function DepreciacaoVeiculosPage() {
  return <DepreciacaoVeiculosClientPT />
}
