import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import MolaridadClient from './MolaridadClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de molaridad online gratuita. Calcula la concentración molar (M) y convierte entre gramos y moles usando masa molar.',
  h1Title: getOptimizedPageTitle('Molaridad'),
  canonical: '/quimica/molaridad/'
})

export default function MolaridadPage() {
  return <MolaridadClient />
}
