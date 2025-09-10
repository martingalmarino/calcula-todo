import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CACClientIT from './CACClientIT'

export const metadata: Metadata = buildMeta({
  title: 'CAC - Costo di Acquisizione del Cliente',
  description: 'Calcola il costo di acquisizione del cliente (CAC) per ottimizzare le tue campagne di marketing e vendite.',
  keywords: ['CAC', 'costo acquisizione cliente', 'marketing', 'ROI', 'calcolatrice']
})

export default function CACPage() {
  return <CACClientIT />
}
