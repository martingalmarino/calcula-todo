import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalcolatriceMutuoClientIT from './CalcolatriceMutuoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Mutuo - Calcolo Rate Mensili e Piano Ammortamento',
  description: 'Calcola le rate mensili, interessi totali e piano di ammortamento per il tuo mutuo. Strumento gratuito per pianificare il finanziamento della tua casa.',
  keywords: [
    'calcolatrice mutuo',
    'rate mutuo',
    'piano ammortamento',
    'interessi mutuo',
    'finanziamento casa',
    'calcolo mutuo'
  ]
})

export default function CalcolatriceMutuoPageIT() {
  return <CalcolatriceMutuoClientIT />
}
