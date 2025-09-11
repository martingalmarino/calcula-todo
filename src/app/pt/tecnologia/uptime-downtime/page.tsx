import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import UptimeDowntimeClientPT from './UptimeDowntimeClientPT'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de uptime e downtime online gratuita. Calcula tempo de disponibilidade e indisponibilidade de serviços web. Ferramenta para administradores de sistema.',
  autoTitle: true,
})

export default function UptimeDowntimePage() {
  return <UptimeDowntimeClientPT />
}
