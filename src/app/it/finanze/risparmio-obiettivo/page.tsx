import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import RisparmioObiettivoClientIT from './RisparmioObiettivoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Risparmio Obiettivo - Calcolo Risparmio Mensile per Obiettivi',
  description: 'Calcola quanto devi risparmiare mensilmente per raggiungere i tuoi obiettivi finanziari. Strumento gratuito per pianificare il risparmio con interesse composto.',
  keywords: [
    'risparmio obiettivo',
    'calcolo risparmio mensile',
    'pianificazione finanziaria',
    'obiettivi risparmio',
    'interesse composto',
    'calcolatrice finanziaria'
  ]
})

export default function RisparmioObiettivoPageIT() {
  return <RisparmioObiettivoClientIT />
}
