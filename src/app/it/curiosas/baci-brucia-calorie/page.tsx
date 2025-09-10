import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import BaciBruciaCalorieClientIT from './BaciBruciaCalorieClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Baci Brucia Calorie - Calcolatrice Online',
  description: 'Calcola quante calorie bruci baciando e abbracciando. Scopri l\'attività fisica nascosta nelle dimostrazioni d\'affetto.',
  keywords: ['baci', 'abbracci', 'calorie', 'esercizio', 'attività fisica']
})

export default function BaciBruciaCaloriePage() {
  return <BaciBruciaCalorieClientIT />
}
