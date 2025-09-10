import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LivelloFreddolosoClientIT from './LivelloFreddolosoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Livello di Freddoloso - Calcolatrice Online',
  description: 'Scopri il tuo livello di freddoloso basato su temperatura e abbigliamento. Calcola quanto freddo senti rispetto agli altri.',
  keywords: ['freddoloso', 'temperatura', 'abbigliamento', 'meteo', 'sensazione termica']
})

export default function LivelloFreddolosoPage() {
  return <LivelloFreddolosoClientIT />
}
