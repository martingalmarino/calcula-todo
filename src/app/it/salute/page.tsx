import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import SaluteClientIT from './SaluteClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrici di Salute',
  description: 'Calcolatrici di salute e benessere in italiano per monitorare il tuo stato di salute, calcolare IMC, TMB, percentuale di grasso corporeo e molto altro.',
  keywords: [
    'calcolatrici salute',
    'IMC',
    'TMB',
    'grasso corporeo',
    'salute',
    'benessere',
    'calcolo salute',
    'medicina'
  ]
})

export default function SalutePage() {
  return <SaluteClientIT />
}
