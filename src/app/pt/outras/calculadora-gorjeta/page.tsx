import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalculadoraGorjetaClientPT from './CalculadoraGorjetaClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de gorjeta online gratuita. Calcula a gorjeta e o total a pagar em restaurantes baseado no valor da conta e porcentagem desejada.',
  autoTitle: true,
})

export default function CalculadoraGorjetaPage() {
  return <CalculadoraGorjetaClientPT />
}
