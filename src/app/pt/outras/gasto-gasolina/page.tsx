import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GastoGasolinaClientPT from './GastoGasolinaClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de gasto de gasolina para viagens online gratuita. Calcula o custo total de combustível baseado na distância, consumo e preço da gasolina.',
  autoTitle: true,
})

export default function GastoGasolinaPage() {
  return <GastoGasolinaClientPT />
}
