import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TrigonometriaClientPT from './TrigonometriaClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de trigonometria online gratuita. Calcular seno, cosseno, tangente e funções trigonométricas inversas. Ferramenta matemática precisa.',
  autoTitle: true,
})

export default function TrigonometriaPage() {
  return <TrigonometriaClientPT />
}
