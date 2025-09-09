import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { TmbClientIT } from './TmbClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Tasso Metabolico Basale (TMB)',
  description: 'Calcola il tuo tasso metabolico basale (TMB) in italiano. Scopri quante calorie bruci a riposo per ottimizzare la tua dieta e il tuo allenamento.',
  keywords: [
    'TMB',
    'tasso metabolico basale',
    'metabolismo',
    'calorie',
    'BMR',
    'dieta',
    'allenamento',
    'calcolatrice metabolismo'
  ]
})

export default function TmbPage() {
  return <TmbClientIT />
}
