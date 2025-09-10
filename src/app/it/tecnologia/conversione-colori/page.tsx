import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ConversioneColoriClientIT from './ConversioneColoriClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Conversione di Colori - Converti HEX RGB CMYK HSL',
  description: 'Converte tra formati di colore HEX, RGB, CMYK e HSL per design e stampa. Calcolatrice gratuita per conversione colori.',
  keywords: [
    'conversione colori',
    'HEX RGB CMYK',
    'design',
    'colori',
    'palette',
    'calcolatrice colori',
    'formati colore'
  ]
})

export default function ConversioneColoriPageIT() {
  return <ConversioneColoriClientIT />
}
