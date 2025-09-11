import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import WortZeichenzaehlerClientDE from './WortZeichenzaehlerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Wort- und Zeichenzähler - Textanalyse Online',
  description: 'Zählen Sie Wörter, Zeichen, Sätze, Absätze und Lesezeit in Ihrem Text. Kostenloser Online-Zähler für Autoren, Studenten und Redakteure.',
  keywords: [
    'wort zähler',
    'zeichen zähler',
    'text analyse',
    'wörter zählen',
    'zeichen zählen',
    'lesezeit',
    'text statistiken',
    'deutsch'
  ]
})

export default function WortZeichenzaehlerPage() {
  return <WortZeichenzaehlerClientDE />
}
