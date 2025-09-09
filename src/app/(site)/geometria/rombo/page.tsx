import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RomboClient from './RomboClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Área y Perímetro del Rombo',
  description: 'Calcula el área y perímetro de un rombo conociendo sus diagonales o lado y diagonal. Herramienta gratuita para cálculos geométricos.',
  keywords: [
    'calculadora rombo',
    'área rombo',
    'perímetro rombo',
    'geometría',
    'matemáticas',
    'cálculo área',
    'fórmula rombo',
    'diagonales'
  ]
})

export default function RomboPage() {
  return <RomboClient />
}
