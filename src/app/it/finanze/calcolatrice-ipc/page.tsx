import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalcolatriceIPCClientIT from './CalcolatriceIPCClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice IPC - Calcolo Inflazione e Potere d\'Acquisto',
  description: 'Calcola il potere d\'acquisto e l\'inflazione usando l\'Indice dei Prezzi al Consumo (IPC). Strumento gratuito per analizzare l\'impatto dell\'inflazione sui tuoi soldi.',
  keywords: [
    'calcolatrice IPC',
    'inflazione',
    'potere acquisto',
    'indice prezzi consumo',
    'calcolo inflazione',
    'finanze'
  ]
})

export default function CalcolatriceIPCPageIT() {
  return <CalcolatriceIPCClientIT />
}
