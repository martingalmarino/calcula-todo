import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AdivinaResultadoClient from './AdivinaResultadoClient'

export const metadata: Metadata = buildMeta({
  title: 'Adivina el Resultado - Juegos de Matemáticas',
  description: 'Observa operaciones paso a paso y adivina el resultado final. ¡Desafía tu capacidad de seguimiento matemático!',
  keywords: ['adivina resultado', 'operaciones paso a paso', 'seguimiento matemático', 'cálculo mental', 'agilidad mental', 'juegos de matemáticas']
})

export default function AdivinaResultadoPage() {
  return <AdivinaResultadoClient />
}
