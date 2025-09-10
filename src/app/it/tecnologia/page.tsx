import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import TecnologiaClientIT from './TecnologiaClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrici di Tecnologia - Strumenti Digitali e Tecnici',
  description: 'Calcolatrici specializzate in tecnologia: conversione di unità, velocità internet, uptime, colori, sicurezza e latenza. Strumenti per sviluppatori e tecnici.',
  keywords: [
    'calcolatrici tecnologia',
    'conversione unità',
    'velocità internet',
    'uptime',
    'colori',
    'sicurezza',
    'latenza',
    'sviluppatori'
  ]
})

export default function TecnologiaPageIT() {
  return <TecnologiaClientIT />
}
