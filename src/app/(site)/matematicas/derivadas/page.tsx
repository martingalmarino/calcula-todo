import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DerivadasClient from './DerivadasClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de derivadas online para derivadas numéricas, analíticas, segunda derivada y métodos de diferencias finitas. Gratis y fácil de usar.',
  canonical: '/matematicas/derivadas/',
  autoTitle: true,
})

export default function DerivadasPage() {
  return <DerivadasClient />
}