import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PotenciasRaicesClient from './PotenciasRaicesClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Potencias y Raíces – Cuadrada, cúbica, n-ésima y notación científica',
  description: 'Calculadora de potencias y raíces online para raíz cuadrada, cúbica, n-ésima, potencias de 10 y notación científica. Gratis y fácil de usar.',
  canonical: '/matematicas/potencias-raices/',
})

export default function PotenciasRaicesPage() {
  return <PotenciasRaicesClient />
}