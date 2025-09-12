import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import MasaMolarClient from './MasaMolarClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de masa molar online gratuita. Calcula la masa molar total de una fórmula química sumando los elementos.',
  h1Title: getOptimizedPageTitle('Masa Molar'),
  canonical: '/quimica/masa-molar/'
})

export default function MasaMolarPage() {
  return <MasaMolarClient />
}
