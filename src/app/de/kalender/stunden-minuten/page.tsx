import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import StundenMinutenClientDE from './StundenMinutenClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Stunden und Minuten-Rechner - Addieren und Subtrahieren von Zeit',
  description: 'Rechnen Sie mit Stunden und Minuten, addieren und subtrahieren Sie Zeit. Kostenloser Online-Zeitrechner.',
  keywords: ['stunden minuten', 'zeit rechner', 'zeit addieren', 'zeit subtrahieren', 'arbeitszeit', 'zeit berechnung']
})

export default function StundenMinutenPage() {
  return <StundenMinutenClientDE />
}
