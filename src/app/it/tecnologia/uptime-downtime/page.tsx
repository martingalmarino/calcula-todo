import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import UptimeDowntimeClientIT from './UptimeDowntimeClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Uptime/Downtime - Calcola Disponibilità Servizi Web',
  description: 'Calcola uptime e downtime di servizi web, server e applicazioni. Calcolatrice gratuita per monitoraggio della disponibilità.',
  keywords: [
    'uptime',
    'downtime',
    'disponibilità',
    'server',
    'monitoraggio',
    'calcolatrice uptime',
    'tempo di attività'
  ]
})

export default function UptimeDowntimePageIT() {
  return <UptimeDowntimeClientIT />
}
