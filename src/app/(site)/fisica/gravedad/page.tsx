import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { GravedadClient } from './GravedadClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Gravedad - F = G·m₁·m₂ / r² | CalculaTodo.online',
  description: 'Calcula fuerza gravitatoria entre dos masas usando la ley de gravitación universal. Ingresa masas y distancia para obtener fuerza en Newtons.',
  keywords: [
    'calculadora gravedad',
    'fuerza gravitatoria',
    'ley gravitación universal',
    'F = Gm1m2/r²',
    'newton',
    'masas',
    'distancia',
    'física',
    'gravitación',
    'constante gravitacional'
  ]
})

export default function GravedadPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Gravedad',
            description: 'Calcula fuerza gravitatoria entre dos masas usando la ley de gravitación universal. Ingresa masas y distancia para obtener fuerza en Newtons.',
            url: '/fisica/gravedad/',
            category: 'Física'
          }))
        }}
      />
      <GravedadClient />
    </div>
  )
}
