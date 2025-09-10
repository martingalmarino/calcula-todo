import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CPCCPMClientIT from './CPCCPMClientIT'

export const metadata: Metadata = buildMeta({
  title: 'CPC / CPM - Costo per Click e per Mille',
  description: 'Calcola il costo per click (CPC) e per mille impressioni (CPM) delle tue campagne pubblicitarie per ottimizzare gli investimenti.',
  keywords: ['CPC', 'CPM', 'costo click', 'impressioni', 'pubblicità', 'marketing']
})

export default function CPCCPMPage() {
  return <CPCCPMClientIT />
}
