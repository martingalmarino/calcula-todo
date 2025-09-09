import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NumerosRomanosClient from './NumerosRomanosClient'

export const metadata: Metadata = buildMeta({
  description: 'Conversor de números romanos online gratuito. Convierte entre números arábigos y romanos. Herramienta educativa para aprender el sistema de numeración romana.',
  canonical: '/otras/numeros-romanos/',
  autoTitle: true,
})

export default function NumerosRomanosPage() {
  return <NumerosRomanosClient />
}
