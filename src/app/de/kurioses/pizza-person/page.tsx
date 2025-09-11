import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PizzaPersonRechnerClientDE from './PizzaPersonRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Pizza-Person-Rechner - Pizzas pro Person berechnen',
  description: 'Kostenloser Pizza-Person-Rechner online. Berechnen Sie, wie viele Pizzen Sie für eine bestimmte Anzahl von Personen benötigen. Perfekte Party-Planung.',
  keywords: [
    'pizza person',
    'pizza berechnen',
    'portionen',
    'party planung',
    'hunger',
    'pizza bestellen'
  ]
})

export default function PizzaPersonPageDE() {
  return <PizzaPersonRechnerClientDE />
}
