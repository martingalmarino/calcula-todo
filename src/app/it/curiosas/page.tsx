import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CuriosasClientIT from './CuriosasClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Curiose - Calcolatrici Online',
  description: 'Calcolatrici curiose e divertenti per scoprire aspetti insoliti della vita quotidiana: caffè, pizza, aspettativa di vita e molto altro.',
  keywords: ['curiose', 'divertenti', 'caffè', 'pizza', 'aspettativa vita', 'calcolatrici']
})

export default function CuriosasPage() {
  return <CuriosasClientIT />
}
