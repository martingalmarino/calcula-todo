import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import OvulacionClient from './OvulacionClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de ovulación y días fértiles online gratuita. Calcula tu ventana fértil, próxima ovulación y ciclo menstrual. Planificación familiar.',
  autoTitle: true,
})

export default function OvulacionPage() {
  return <OvulacionClient />
}
