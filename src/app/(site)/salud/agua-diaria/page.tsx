import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import AguaDiariaClient from './AguaDiariaClient'

export const metadata: Metadata = buildMeta({
  description: 'Calculadora de agua diaria recomendada online gratuita. Calcula cuánta agua debes beber según tu peso, edad y nivel de actividad. Hidratación saludable.',
  canonical: '/salud/agua-diaria/',
  autoTitle: true,
})

export default function AguaDiariaPage() {
  return <AguaDiariaClient />
}
