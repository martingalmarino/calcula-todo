import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import IndovinaRisultatoClientIT from './IndovinaRisultatoClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Indovina il Risultato - Giochi Matematici',
  description: 'Osserva operazioni passo dopo passo e indovina il risultato finale. Sfida la tua capacità di seguimento matematico!',
  keywords: ['indovina', 'risultato', 'operazioni', 'passo dopo passo', 'seguimento matematico', 'calcolo mentale', 'agilità mentale', 'osservazione']
})

export default function IndovinaRisultatoPage() {
  return <IndovinaRisultatoClientIT />
}
