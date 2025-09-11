import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import GesundheitClientDE from './GesundheitClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Gesundheitsrechner - BMI, Kalorien, Schlaf und mehr',
  description: 'Kostenlose Online-Gesundheitsrechner: BMI, Idealgewicht, Kalorien, Wasser, Schlaf und Sport. Präzise Gesundheitstools.',
  keywords: [
    'gesundheitsrechner',
    'bmi rechner',
    'kalorienrechner',
    'idealgewicht',
    'wasserrechner',
    'schlafrechner',
    'sportrechner',
    'gesundheit online',
    'fitness rechner'
  ]
})

export default function GesundheitPageDE() {
  return <GesundheitClientDE />
}
