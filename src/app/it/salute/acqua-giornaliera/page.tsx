import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AcquaGiornalieraClientIT from './AcquaGiornalieraClientIT'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrice Acqua Giornaliera Raccomandata',
  description: 'Calcola la quantità di acqua giornaliera raccomandata in italiano. Scopri quanto bere per mantenere una corretta idratazione e salute.',
  keywords: [
    'acqua giornaliera',
    'idratazione',
    'acqua raccomandata',
    'salute',
    'benessere',
    'liquidi',
    'calcolatrice acqua',
    'idratazione corpo'
  ]
})

export default function AcquaGiornalieraPage() {
  return <AcquaGiornalieraClientIT />
}
