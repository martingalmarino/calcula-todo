import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AltreClientIT from './AltreClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Altre Calcolatrici - Scala di Voti, Benzina, Parole, Romani e Click',
  description: 'Calcolatrici utili online: scala di voti, spesa benzina, contatore di parole, convertitore di numeri romani e contatore di click. Strumenti pratici gratuiti.',
  keywords: [
    'altre calcolatrici',
    'scala di voti',
    'spesa benzina',
    'contatore parole',
    'numeri romani',
    'contatore click',
    'CPS test',
    'calcolatrici utili',
    'strumenti online'
  ]
})

export default function AltrePageIT() {
  return <AltreClientIT />
}
