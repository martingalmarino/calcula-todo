import { Metadata } from 'next'
import { BeijosCaloriasClientPT } from './BeijosCaloriasClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Beijos e Calorias - Calculadoras Online',
  description: 'Calcule as calorias queimadas por beijos, abraços e risadas. Descubra equivalências divertidas e surpreenda-se com os resultados.',
  keywords: ['beijos calorias', 'calorias abraços', 'calorias risadas', 'calculadora calorias', 'exercício leve']
})

export default function BeijosCaloriasPage() {
  return <BeijosCaloriasClientPT />
}
