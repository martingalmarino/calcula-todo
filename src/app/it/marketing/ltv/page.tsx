import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LTVClientIT from './LTVClientIT'

export const metadata: Metadata = buildMeta({
  title: 'LTV - Lifetime Value del Cliente',
  description: 'Calcola il valore a lungo termine (LTV) di un cliente per ottimizzare le tue strategie di retention e marketing.',
  keywords: ['LTV', 'lifetime value', 'valore cliente', 'marketing', 'retention']
})

export default function LTVPage() {
  return <LTVClientIT />
}
