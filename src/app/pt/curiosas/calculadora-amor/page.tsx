import { Metadata } from 'next'
import CalculadoraAmorClientPT from './CalculadoraAmorClientPT'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora do Amor - Calculadoras Online',
  description: 'Descubra a compatibilidade entre dois nomes com nossa calculadora do amor. Teste a química entre nomes de forma divertida.',
  keywords: ['calculadora amor', 'compatibilidade nomes', 'teste amor', 'química nomes', 'calculadora relacionamento']
})

export default function CalculadoraAmorPage() {
  return <CalculadoraAmorClientPT />
}
