import { Metadata } from 'next'
import { buildMeta, jsonLdCalculator } from '@/lib/seo'
import { getCalculator } from '@/lib/site.config'
import CoeficienteBinomialClient from './CoeficienteBinomialClient'

export async function generateMetadata(): Promise<Metadata> {
  const calculator = getCalculator('matematicas', 'coeficiente-binomial')
  
  if (!calculator) {
    return buildMeta({
      title: 'Calculadora del Coeficiente Binomial',
      description: 'Calcular el coeficiente binomial C(n,k) para combinaciones y probabilidades',
      canonical: '/matematicas/coeficiente-binomial'
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

export default function CoeficienteBinomialPage() {
  const calculator = getCalculator('matematicas', 'coeficiente-binomial')
  
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
      <CoeficienteBinomialClient />
    </>
  )
}
