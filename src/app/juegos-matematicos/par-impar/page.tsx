import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ParImparClient from './ParImparClient'

export const metadata: Metadata = buildMeta({
  title: 'Par o Impar Exprés - Clasificación Rápida de Números',
  description: 'Clasifica números como pares o impares antes de que termine el tiempo. ¡Desafía tu agilidad mental y reconocimiento numérico!',
  keywords: ['par', 'impar', 'números pares', 'números impares', 'clasificación', 'agilidad mental', 'reconocimiento numérico', 'velocidad']
})

export default function ParImparPage() {
  return <ParImparClient />
}
