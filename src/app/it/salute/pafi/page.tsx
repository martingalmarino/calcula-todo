import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import PafiClientIT from './PafiClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice PaFi',
  description: 'Calcola l\'indice PaFi (Pressione arteriosa/Frequenza cardiaca) in italiano. Valuta la funzione cardiovascolare e la salute del cuore.',
  keywords: [
    'PaFi',
    'pressione arteriosa',
    'frequenza cardiaca',
    'cuore',
    'cardiovascolare',
    'salute cuore',
    'calcolatrice PaFi',
    'monitoraggio cardiaco'
  ]
})

export default function PafiPage() {
  return <PafiClientIT />
}
