import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import DormireAbbastanzaClientIT from './DormireAbbastanzaClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('dormire-abbastanza')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Dormi Abbastanza? - Quiz di Abitudini del Sonno',
  description: triviaConfig?.description || 'Metti alla prova le tue conoscenze sul sonno e le abitudini salutari. Impara quante ore hai bisogno di dormire secondo la tua età.',
  keywords: triviaConfig?.keywords || ['sonno', 'dormire', 'abitudini salutari', 'insonnia', 'salute mentale', 'riposo', 'trivia educativa']
})

export default function DormireAbbastanzaPage() {
  return <DormireAbbastanzaClientIT />
}
