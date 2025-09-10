import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AnalisiPasswordClientIT from './AnalisiPasswordClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Analisi delle Password - Verifica Sicurezza Password',
  description: 'Analizza la sicurezza e la forza delle tue password. Calcolatrice gratuita per verificare la robustezza delle password.',
  keywords: [
    'analisi password',
    'sicurezza password',
    'password sicure',
    'cybersecurity',
    'verifica password',
    'forza password'
  ]
})

export default function AnalisiPasswordPageIT() {
  return <AnalisiPasswordClientIT />
}
