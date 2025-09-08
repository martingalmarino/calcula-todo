import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { buildMeta, jsonLdWebSite } from '@/lib/seo'
import { SITE } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Online Gratuitas',
  description: 'Facilitamos tus cálculos en temas de finanzas, salud, matemática, calendario, geometría y más. Calculadoras online gratuitas, rápidas y amigables.',
  canonical: '/',
  keywords: [
    'calculadoras online',
    'matemáticas',
    'finanzas',
    'salud',
    'calendario',
    'geometría',
    'gratis',
    'educación'
  ]
})

export default function HomePage() {
  // Obtener todas las calculadoras de matemáticas
  const mathCalculators = SITE.clusters.matematicas.calculators

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebSite()),
        }}
      />
      
      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-8">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Calculadoras Online Gratuitas
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Facilitamos tus cálculos en temas de finanzas, salud, matemática, calendario, geometría y más. 
                Calculadoras online gratuitas, rápidas y amigables.
              </p>
            </div>

            {/* Calculator Links Grid - Similar to the reference image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              
              {/* Left Column */}
              <div className="space-y-3">
                {mathCalculators.slice(0, 5).map((calculator, index) => (
                  <Link 
                    key={calculator.href}
                    href={calculator.href} 
                    className="calculator-link-box"
                  >
                    <span className="arrow-icon">→</span>
                    <span className="link-text">Calculadora de {calculator.label}</span>
                  </Link>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                {mathCalculators.slice(5, 10).map((calculator, index) => (
                  <Link 
                    key={calculator.href}
                    href={calculator.href} 
                    className="calculator-link-box"
                  >
                    <span className="arrow-icon">→</span>
                    <span className="link-text">Calculadora de {calculator.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Additional Categories Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Más Calculadoras por Categoría
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Calculadoras de Calendario */}
                <div className="category-section">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Calendario</h3>
                  <div className="space-y-2">
                    <Link href="/calendario/dias-entre-fechas/" className="category-button category-calendar">
                      Contador de Días entre Fechas
                    </Link>
                    <Link href="/calendario/calculadora-edad/" className="category-button category-calendar">
                      Calculadora de Edad
                    </Link>
                    <Link href="/calendario/sumar-restar-dias/" className="category-button category-calendar">
                      Sumar/Restar Días a una Fecha
                    </Link>
                  </div>
                </div>

                {/* Calculadoras de Salud */}
                <div className="category-section">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🏥 Salud</h3>
                  <div className="space-y-2">
                    <Link href="/salud/imc/" className="category-button category-health">
                      Índice Masa Corporal (IMC)
                    </Link>
                    <Link href="/salud/tmb/" className="category-button category-health">
                      Tasa Metabólica Basal (TMB)
                    </Link>
                    <Link href="/salud/grasa-corporal/" className="category-button category-health">
                      Porcentaje Grasa Corporal
                    </Link>
                  </div>
                </div>

                {/* Calculadoras de Geometría */}
                <div className="category-section">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📐 Geometría</h3>
                  <div className="space-y-2">
                    <Link href="/geometria/circulo/" className="category-button category-geometry">
                      Área y Perímetro del Círculo
                    </Link>
                    <Link href="/geometria/rectangulo/" className="category-button category-geometry">
                      Área y Perímetro del Rectángulo
                    </Link>
                    <Link href="/geometria/triangulo/" className="category-button category-geometry">
                      Área del Triángulo
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

