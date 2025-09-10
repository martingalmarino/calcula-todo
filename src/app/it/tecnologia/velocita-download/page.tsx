import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import VelocitaDownloadClientIT from './VelocitaDownloadClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Velocità di Download - Calcola Tempo Download e Mbps MB/s',
  description: 'Calcola il tempo di download e converte tra Mbps e MB/s per la tua connessione internet. Calcolatrice gratuita per velocità di rete.',
  keywords: [
    'velocità download',
    'Mbps MB/s',
    'tempo download',
    'internet speed',
    'calcolatrice velocità',
    'connessione internet'
  ]
})

export default function VelocitaDownloadPageIT() {
  return <VelocitaDownloadClientIT />
}
