import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TageAddierenSubtrahierenClientDE from './TageAddierenSubtrahierenClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Tage addieren/subtrahieren - Addieren oder subtrahieren Sie Tage zu einem Datum',
  description: 'Addieren oder subtrahieren Sie Tage zu einem Datum. Kostenloser Online-Datumsrechner mit automatischer Monats- und Jahresberechnung.',
  keywords: ['tage addieren', 'tage subtrahieren', 'datum berechnung', 'datum rechner', 'kalender', 'datum operationen']
})

export default function TageAddierenSubtrahierenPage() {
  return <TageAddierenSubtrahierenClientDE />
}
