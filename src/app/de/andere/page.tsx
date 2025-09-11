import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AndereClientDE from './AndereClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Andere Rechner - Verschiedene nützliche Tools',
  description: 'Entdecken Sie unsere Sammlung von anderen nützlichen Rechnern: Notenskala, Benzin-Reise, Wort- und Zeichenzähler, römische Zahlen, Klick-Zähler und Trinkgeld-Rechner.',
  keywords: [
    'andere rechner',
    'notenskala',
    'benzin reise',
    'wort zähler',
    'zeichen zähler',
    'römische zahlen',
    'klick zähler',
    'trinkgeld rechner',
    'nützliche tools',
    'deutsch'
  ]
})

export default function AnderePage() {
  return <AndereClientDE />
}
