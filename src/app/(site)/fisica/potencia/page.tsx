import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { PotenciaClient } from './PotenciaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Potencia - P = W/t | CalculaTodo.online',
  description: 'Calcula potencia dividiendo trabajo entre tiempo. Ingresa trabajo y tiempo para obtener potencia en Watts con conversiones automáticas.',
  keywords: [
    'calculadora potencia',
    'P = W/t',
    'potencia',
    'trabajo tiempo',
    'watts',
    'física',
    'energía',
    'potencia eléctrica',
    'caballos de fuerza'
  ]
})

export default function PotenciaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Potencia',
            description: 'Calcula potencia dividiendo trabajo entre tiempo. Ingresa trabajo y tiempo para obtener potencia en Watts.',
            url: '/fisica/potencia/',
            category: 'Física'
          }))
        }}
      />
      <PotenciaClient />
    </div>
  )
}
