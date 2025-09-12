import { Metadata } from 'next'
import { buildMeta, jsonLdCalculator } from '@/lib/seo'
import { getCalculator } from '@/lib/site.config'
import NecesidadesEnergeticasClient from './NecesidadesEnergeticasClient'

export async function generateMetadata(): Promise<Metadata> {
  const calculator = getCalculator('salud', 'necesidades-energeticas')
  
  if (!calculator) {
    return buildMeta({
      title: 'Calculadora de Necesidades Energéticas Diarias',
      description: 'Calcula tus necesidades energéticas diarias (NED) para mantener el equilibrio energético',
      canonical: '/salud/necesidades-energeticas'
    })
  }

  return buildMeta({
    title: `${calculator.label} - Calculadora Online Gratis`,
    description: calculator.description,
    canonical: calculator.href,
    keywords: calculator.keywords,
    h1Title: calculator.label
  })
}

export default function NecesidadesEnergeticasPage() {
  const calculator = getCalculator('salud', 'necesidades-energeticas')
  
  if (!calculator) {
    return <div>Calculadora no encontrada</div>
  }

  const structuredData = jsonLdCalculator({
    name: calculator.label,
    description: calculator.description,
    url: `https://www.calculatodo.online${calculator.href}`,
    category: calculator.category
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NecesidadesEnergeticasClient />
    </>
  )
}
