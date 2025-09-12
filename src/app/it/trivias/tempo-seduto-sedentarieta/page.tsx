import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TempoSedutoSedentarietaClientIT from './TempoSedutoSedentarietaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Quanto tempo passi seduto? (Sedentarietà) - Quiz Stile di Vita',
  description: 'Scopri i rischi della sedentarietà e impara come combattere gli effetti dello stare seduto troppo tempo. Conosci le raccomandazioni per uno stile di vita più attivo.',
  canonical: '/it/trivias/tempo-seduto-sedentarieta',
  keywords: ['sedentarietà', 'tempo seduto', 'salute', 'pause attive', 'stile di vita', 'lavoro', 'ufficio', 'quiz educativo']
})

export default function TempoSedutoSedentarietaPage() {
  return <TempoSedutoSedentarietaClientIT />
}
