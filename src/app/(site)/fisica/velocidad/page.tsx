import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { VelocidadClient } from './VelocidadClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Velocidad - v = d/t | CalculaTodo.online',
  description: 'Calcula velocidad promedio con distancia y tiempo. Soporta unidades m/s, km/h, m/min. Fórmula v = d/t explicada paso a paso.',
  keywords: [
    'calculadora velocidad',
    'velocidad promedio',
    'distancia tiempo',
    'm/s',
    'km/h',
    'fórmula velocidad',
    'v = d/t',
    'movimiento',
    'física',
    'cinemática'
  ]
})

export default function VelocidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Velocidad',
            description: 'Calcula velocidad promedio con distancia y tiempo. Soporta unidades m/s, km/h, m/min. Fórmula v = d/t explicada paso a paso.',
            url: '/fisica/velocidad/',
            category: 'Física'
          }))
        }}
      />
      <VelocidadClient />
    </div>
  )
}
