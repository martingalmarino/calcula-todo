import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import NotenskalaRechnerClientDE from './NotenskalaRechnerClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Notenskala-Rechner - Konvertierung A B C D F',
  description: 'Konvertieren Sie numerische Bewertungen in Buchstabenskalen (A, B, C, D, F). Kostenloser Online-Rechner für Schulnoten und Bewertungen.',
  keywords: [
    'notenskala',
    'bewertung',
    'schulnoten',
    'punkte',
    'skala',
    'a b c d f',
    'noten konvertierung',
    'deutsch'
  ]
})

export default function NotenskalaPage() {
  return <NotenskalaRechnerClientDE />
}
