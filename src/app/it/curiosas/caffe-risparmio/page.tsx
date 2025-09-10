import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CaffeRisparmioClientIT from './CaffeRisparmioClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Caffè vs. Risparmio - Calcolatrice Online',
  description: 'Scopri quanto risparmieresti se smettessi di prendere il caffè ogni giorno. Calcola il tuo potenziale risparmio a lungo termine.',
  keywords: ['caffè', 'risparmio', 'denaro', 'interesse composto', 'calcolatrice']
})

export default function CaffeRisparmioPage() {
  return <CaffeRisparmioClientIT />
}
