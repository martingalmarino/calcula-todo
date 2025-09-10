import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import BudgetClientIT from './BudgetClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Budget di Marketing',
  description: 'Pianifica e distribuisci il tuo budget pubblicitario in modo efficace per massimizzare i risultati delle tue campagne.',
  keywords: ['budget', 'marketing', 'pubblicità', 'pianificazione', 'investimento']
})

export default function BudgetPage() {
  return <BudgetClientIT />
}
