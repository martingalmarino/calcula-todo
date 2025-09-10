import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConversioneArchiviazioneClientIT from './ConversioneArchiviazioneClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Conversione di Archiviazione - Converti KB MB GB TB',
  description: 'Converte tra diverse unità di archiviazione (KB, MB, GB, TB) usando sistemi decimali e binari. Calcolatrice gratuita per unità digitali.',
  keywords: [
    'conversione archiviazione',
    'KB MB GB TB',
    'unità digitali',
    'storage converter',
    'calcolatrice archiviazione',
    'conversione unità'
  ]
})

export default function ConversioneArchiviazionePageIT() {
  return <ConversioneArchiviazioneClientIT />
}
