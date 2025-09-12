import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OperacionesMixtasClient from './OperacionesMixtasClient'

export const metadata: Metadata = buildMeta({
  title: 'Operaciones Mixtas Rápidas - Juegos de Matemáticas',
  description: 'Resuelve operaciones mixtas de suma, resta, multiplicación y división en tiempo limitado. ¡Desafía tu agilidad mental!',
  keywords: ['operaciones mixtas', 'suma', 'resta', 'multiplicación', 'división', 'agilidad mental', 'cálculo mental', 'juegos de matemáticas']
})

export default function OperacionesMixtasPage() {
  return <OperacionesMixtasClient />
}
