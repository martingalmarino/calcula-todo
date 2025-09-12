import { Metadata } from 'next'
import { buildMeta, jsonLdCalculator } from '@/lib/seo'
import { getCalculator } from '@/lib/site.config'
import FechaConcepcionClient from './FechaConcepcionClient'

export async function generateMetadata(): Promise<Metadata> {
  const calculator = getCalculator('salud', 'fecha-concepcion')
  
  if (!calculator) {
    return buildMeta({
      title: 'Calculadora de Fecha de Concepción de Embarazo',
      description: 'Calcula la fecha probable de concepción basándose en la fecha de parto o última menstruación',
      canonical: '/salud/fecha-concepcion'
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

export default function FechaConcepcionPage() {
  const calculator = getCalculator('salud', 'fecha-concepcion')
  
  if (!calculator) {
    return <div>Calculadora no encontrada</div>
  }

  const structuredData = jsonLdCalculator({
    name: calculator.label,
    description: calculator.description,
    url: `https://www.calculatodo.online${calculator.href}`
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FechaConcepcionClient />
    </>
  )
}
