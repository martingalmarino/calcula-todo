import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GastoGasolinaClient from './GastoGasolinaClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de gasto de gasolina online gratuita. Calcula el costo de combustible por kilómetro, litros consumidos y gasto total. Herramienta para planificar viajes.',
  autoTitle: true,
})

export default function GastoGasolinaPage() {
  return <GastoGasolinaClient />
}
