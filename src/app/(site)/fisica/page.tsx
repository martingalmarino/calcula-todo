import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { FisicaClient } from './FisicaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Física – Resuelve problemas de mecánica y electricidad',
  description: 'Calculadoras de física para velocidad, fuerza, energía cinética, potencia, ley de Ohm y gravedad. Fórmulas fundamentales explicadas paso a paso.',
  keywords: [
    'calculadoras física',
    'velocidad',
    'fuerza',
    'energía cinética',
    'potencia',
    'ley ohm',
    'gravedad',
    'mecánica',
    'electricidad',
    'física online',
    'newton',
    'joules',
    'watts'
  ]
})

export default function FisicaPage() {
  return <FisicaClient />
}
