import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import LiebesRechnerClientDE from './LiebesRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Liebes-Rechner - Liebeskompatibilität zwischen Namen berechnen',
  description: 'Kostenloser Liebes-Rechner online. Berechnen Sie die Liebeskompatibilität zwischen zwei Namen. Entdecken Sie Ihr Liebespotenzial.',
  keywords: [
    'liebes rechner',
    'kompatibilität',
    'namen',
    'liebe',
    'beziehung',
    'romantik'
  ]
})

export default function LiebesPageDE() {
  return <LiebesRechnerClientDE />
}
