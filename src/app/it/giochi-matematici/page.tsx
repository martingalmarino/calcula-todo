import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GiochiMatematiciClientIT from './GiochiMatematiciClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Giochi di Intelligenza Matematica - Divertiti Imparando',
  description: 'Giochi di matematica facili per bambini e adulti. Somme, sottrazioni, frazioni e altro. Migliora la tua agilità mentale con i nostri giochi educativi gratuiti.',
  keywords: ['giochi di matematica', 'giochi educativi', 'matematica facile', 'somme e sottrazioni', 'frazioni', 'agilità mentale', 'giochi per bambini']
})

export default function GiochiMatematiciPage() {
  return <GiochiMatematiciClientIT />
}
