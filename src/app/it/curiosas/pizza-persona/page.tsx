import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PizzaPersonaClientIT from './PizzaPersonaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Pizza per Persona - Calcolatrice Online',
  description: 'Calcola quante pizze servono per il tuo gruppo di amici. Scopri la quantità perfetta di pizza per ogni occasione.',
  keywords: ['pizza', 'porzioni', 'persone', 'cibo', 'calcolatrice']
})

export default function PizzaPersonaPage() {
  return <PizzaPersonaClientIT />
}
