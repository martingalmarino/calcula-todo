import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TempoFilmClientIT from './TempoFilmClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Tempo nei Film - Calcolatrice Online',
  description: 'Scopri quanto tempo della tua vita hai passato guardando film. Calcola le ore dedicate al cinema e alle serie TV.',
  keywords: ['film', 'tempo', 'cinema', 'intrattenimento', 'serie tv']
})

export default function TempoFilmPage() {
  return <TempoFilmClientIT />
}
