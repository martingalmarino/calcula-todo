import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AlterTiereRechnerClientDE from './AlterTiereRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Alter-Tiere-Rechner - Haustieralter in Menschenjahre umrechnen',
  description: 'Kostenloser Alter-Tiere-Rechner online. Konvertieren Sie das Alter Ihrer Haustiere in Menschenjahre. Verstehen Sie das Alter Ihrer Hunde und Katzen.',
  keywords: [
    'alter tiere',
    'haustiere alter',
    'hunde alter',
    'katzen alter',
    'menschenjahre',
    'tieralter'
  ]
})

export default function AlterTierePageDE() {
  return <AlterTiereRechnerClientDE />
}
