import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import BMIRechnerClientDE from './BMIRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'BMI-Rechner - Body-Mass-Index berechnen',
  description: 'Kostenloser BMI-Rechner online. Berechnen Sie Ihren Body-Mass-Index und bewerten Sie Ihr Gewicht. Präzise BMI-Berechnung mit Empfehlungen.',
  keywords: [
    'bmi rechner',
    'body mass index',
    'gewicht berechnen',
    'bmi formel',
    'gesundheitsrechner',
    'gewicht bewertung',
    'körpermasse index'
  ]
})

export default function BMIPageDE() {
  return <BMIRechnerClientDE />
}
