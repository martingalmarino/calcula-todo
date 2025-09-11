import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PotenciasRaizesClientPT from './PotenciasRaizesClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de potências e raízes online gratuita. Calcular potências, raízes quadradas, cúbicas e n-ésimas. Ferramenta matemática precisa.',
  autoTitle: true,
})

export default function PotenciasRaizesPage() {
  return <PotenciasRaizesClientPT />
}
