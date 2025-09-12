import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { EnergiaCineticaClient } from './EnergiaCineticaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Energía Cinética - Ec = ½·m·v² | CalculaTodo.online',
  description: 'Calcula energía cinética usando la fórmula Ec = ½·m·v². Ingresa masa y velocidad para obtener energía en Joules con conversiones automáticas.',
  keywords: [
    'calculadora energía cinética',
    'Ec = ½mv²',
    'energía cinética',
    'masa velocidad',
    'joules',
    'física',
    'mecánica',
    'energía',
    'movimiento'
  ]
})

export default function EnergiaCineticaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Energía Cinética',
            description: 'Calcula energía cinética usando la fórmula Ec = ½·m·v². Ingresa masa y velocidad para obtener energía en Joules.',
            url: '/fisica/energia-cinetica/',
            category: 'Física'
          }))
        }}
      />
      <EnergiaCineticaClient />
    </div>
  )
}
