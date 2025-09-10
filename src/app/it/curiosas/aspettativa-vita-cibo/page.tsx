import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AspettativaVitaCiboClientIT from './AspettativaVitaCiboClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Aspettativa di Vita e Cibo - Calcolatrice Online',
  description: 'Scopri come il cibo spazzatura influisce sulla tua aspettativa di vita. Calcola l\'impatto delle tue abitudini alimentari.',
  keywords: ['aspettativa vita', 'cibo spazzatura', 'salute', 'calorie', 'alimentazione']
})

export default function AspettativaVitaCiboPage() {
  return <AspettativaVitaCiboClientIT />
}
