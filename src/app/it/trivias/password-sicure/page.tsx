import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PasswordSicureClientIT from './PasswordSicureClientIT'
import { getTriviaByIdIT } from '@/lib/trivias-config-it'

const triviaConfig = getTriviaByIdIT('password-sicure')

export const metadata: Metadata = buildMeta({
  title: triviaConfig?.title || 'Quiz di Password Sicure - Cybersicurezza',
  description: triviaConfig?.description || 'Impara sulla cybersicurezza e le buone pratiche per creare password sicure. Scopri come proteggere i tuoi account digitali in modo efficace.',
  keywords: triviaConfig?.keywords || ['password', 'sicurezza', 'cybersicurezza', 'protezione', 'account', 'digitale', 'privacy', 'trivia educativa']
})

export default function PasswordSicurePage() {
  return <PasswordSicureClientIT />
}