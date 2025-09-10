import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import ContatoreClickCPSClientIT from './ContatoreClickCPSClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Contatore di Click (CPS Test) - Test Velocità Click al Secondo',
  description: 'Testa la tua velocità di click per secondo (CPS). Misura la tua destrezza con il mouse e confronta i tuoi risultati con altri giocatori.',
  keywords: [
    'contatore click',
    'CPS test',
    'velocità click',
    'test mouse',
    'click per secondo',
    'destrezza mouse'
  ]
})

export default function ContatoreClickCPSPageIT() {
  return <ContatoreClickCPSClientIT />
}
