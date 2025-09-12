import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OperazioniMisteClientIT from './OperazioniMisteClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Operazioni Miste Rapide - Giochi Matematici',
  description: 'Risolvi operazioni miste di somma, sottrazione, moltiplicazione e divisione in tempo limitato. Sfida la tua agilità mentale!',
  keywords: ['operazioni', 'miste', 'somma', 'sottrazione', 'moltiplicazione', 'divisione', 'agilità mentale', 'calcolo mentale', 'espressioni']
})

export default function OperazioniMistePage() {
  return <OperazioniMisteClientIT />
}
