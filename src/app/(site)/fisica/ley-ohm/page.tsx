import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { LeyOhmClient } from './LeyOhmClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Ley de Ohm - V = I·R | CalculaTodo.online',
  description: 'Calcula tensión, corriente o resistencia usando la ley de Ohm. Ingresa dos valores para calcular el tercero automáticamente.',
  keywords: [
    'calculadora ley ohm',
    'V = I·R',
    'tensión',
    'corriente',
    'resistencia',
    'voltios',
    'amperios',
    'ohmios',
    'electricidad',
    'circuitos'
  ]
})

export default function LeyOhmPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Ley de Ohm',
            description: 'Calcula tensión, corriente o resistencia usando la ley de Ohm. Ingresa dos valores para calcular el tercero automáticamente.',
            url: '/fisica/ley-ohm/',
            category: 'Física'
          }))
        }}
      />
      <LeyOhmClient />
    </div>
  )
}
