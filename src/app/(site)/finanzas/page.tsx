import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import FinanzasClient from './FinanzasClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Finanzas - Interés Simple, Hipotecas, Depreciación y Más',
  description: 'Calculadoras financieras online gratuitas: interés simple, hipotecas, depreciación de vehículos, IPC, ahorro objetivo, valor futuro y presente. Herramientas financieras precisas.',
  keywords: [
    'calculadoras financieras',
    'interés simple',
    'hipotecas',
    'depreciación vehículos',
    'IPC',
    'ahorro objetivo',
    'valor futuro',
    'valor presente',
    'finanzas online',
    'calculadoras económicas'
  ]
})

export default function FinanzasPage() {
  return <FinanzasClient />
}
