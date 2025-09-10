import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ROIClientIT from './ROIClientIT'

export const metadata: Metadata = buildMeta({
  title: 'ROI in Marketing - Ritorno sull\'Investimento',
  description: 'Misura il ritorno sull\'investimento (ROI) delle tue campagne pubblicitarie per valutare l\'efficacia del marketing.',
  keywords: ['ROI', 'ritorno investimento', 'marketing', 'campagne', 'profitto']
})

export default function ROIPage() {
  return <ROIClientIT />
}
