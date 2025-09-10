import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import MarketingClientIT from './MarketingClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Marketing - Calcolatrici Online',
  description: 'Calcolatrici di marketing per analizzare CAC, LTV, conversioni, budget e ROI delle tue campagne pubblicitarie.',
  keywords: ['marketing', 'CAC', 'LTV', 'conversione', 'ROI', 'budget marketing', 'CPC', 'CPM']
})

export default function MarketingPage() {
  return <MarketingClientIT />
}
