import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import QuimicaClient from './QuimicaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Química - pH, Molaridad, Gases Ideales y Más',
  description: 'Calculadoras químicas online gratuitas: pH, molaridad, ley de gases ideales, masa molar, energía de enlace y diluciones. Herramientas esenciales para estudiantes y profesionales.',
  keywords: [
    'calculadoras de química',
    'pH',
    'molaridad',
    'gases ideales',
    'masa molar',
    'energía de enlace',
    'diluciones',
    'química online',
    'calculadoras químicas',
    'PV=nRT',
    'C1V1=C2V2'
  ]
})

export default function QuimicaPage() {
  return <QuimicaClient />
}
