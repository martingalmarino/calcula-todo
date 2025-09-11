import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import KuriosesClientDE from './KuriosesClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Kurioses Rechner - Lustige und interessante Berechnungen',
  description: 'Kostenlose Online-Kurioses-Rechner: Kuss-Kalorien, Kaffee-Spar, Liebes-Rechner, Bier-Party, Alter-Tiere und Pizza-Person. Unterhaltsame Berechnungen.',
  keywords: [
    'kurioses rechner',
    'lustige rechner',
    'kuss kalorien',
    'kaffee sparen',
    'liebes rechner',
    'bier party',
    'alter tiere',
    'pizza person',
    'unterhaltsame berechnungen'
  ]
})

export default function KuriosesPageDE() {
  return <KuriosesClientDE />
}
