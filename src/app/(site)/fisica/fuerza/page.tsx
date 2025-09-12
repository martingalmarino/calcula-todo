import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { FuerzaClient } from './FuerzaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Fuerza - F = m·a | CalculaTodo.online',
  description: 'Calcula fuerza aplicando la segunda ley de Newton. Ingresa masa y aceleración para obtener fuerza en Newtons. Fórmula F = m·a explicada.',
  keywords: [
    'calculadora fuerza',
    'segunda ley newton',
    'F = ma',
    'masa aceleración',
    'newtons',
    'física',
    'mecánica',
    'dinámica',
    'fuerza neta'
  ]
})

export default function FuerzaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Fuerza',
            description: 'Calcula fuerza aplicando la segunda ley de Newton. Ingresa masa y aceleración para obtener fuerza en Newtons.',
            url: '/fisica/fuerza/',
            category: 'Física'
          }))
        }}
      />
      <FuerzaClient />
    </div>
  )
}
