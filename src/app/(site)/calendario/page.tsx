import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import CalendarioClient from './CalendarioClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Calendario - Fechas, Edad, Horas y Vacaciones',
  description: 'Calculadoras de calendario online gratuitas: días entre fechas, calculadora de edad, sumar/restar días, horas y minutos, días de vacaciones. Herramientas de tiempo y fechas.',
  canonical: '/calendario/',
  keywords: [
    'calculadoras calendario',
    'días entre fechas',
    'calculadora edad',
    'sumar restar días',
    'horas minutos',
    'días vacaciones',
    'calculadoras tiempo',
    'herramientas fechas'
  ]
})

export default function CalendarioPage() {
  return <CalendarioClient />
}
