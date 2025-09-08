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
            <div className="text-center mb-16">
              <h1 className="hero-title">
                Calculadoras Online Gratuitas
              </h1>
              <p className="hero-subtitle">
                Facilitamos tus cálculos en temas de finanzas, salud, matemática, calendario, geometría y más. 
                Calculadoras online gratuitas, rápidas y amigables.
              </p>
            </div>

            {/* Calculator Links Grid - Similar to the reference image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              
              {/* Left Column */}
              <div className="space-y-4">
                {mathCalculators.slice(0, 5).map((calculator) => (
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
              <div className="space-y-4">
                {mathCalculators.slice(5, 10).map((calculator) => (
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

            {/* Additional Categories Section - New Responsive Design */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Más Calculadoras por Categoría
              </h2>
              
              {/* Categories Grid - Responsive */}
              <div className="space-y-12">
                
                {/* Calendario Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📅</span>
                    <h3 className="text-xl font-bold text-gray-900">Calendario</h3>
                  </div>
                  <div className="pills-container">
                    <Link href="/calendario/dias-entre-fechas/" className="pill-link pill-calendar">
                      Contador de Días entre Fechas
                    </Link>
                    <Link href="/calendario/calculadora-edad/" className="pill-link pill-calendar">
                      Calculadora de Edad
                    </Link>
                    <Link href="/calendario/sumar-restar-dias/" className="pill-link pill-calendar">
                      Sumar/Restar Días a una Fecha
                    </Link>
                    <Link href="/calendario/horas-minutos/" className="pill-link pill-calendar">
                      Calculadora de Horas y Minutos
                    </Link>
                    <Link href="/calendario/dias-vacaciones/" className="pill-link pill-calendar">
                      Días de Vacaciones
                    </Link>
                  </div>
                </div>

                {/* Salud Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-xl font-bold text-gray-900">Salud</h3>
                  </div>
                  <div className="pills-container">
                    <Link href="/salud/imc/" className="pill-link pill-health">
                      Índice Masa Corporal (IMC)
                    </Link>
                    <Link href="/salud/tmb/" className="pill-link pill-health">
                      Tasa Metabólica Basal (TMB)
                    </Link>
                    <Link href="/salud/grasa-corporal/" className="pill-link pill-health">
                      Porcentaje Grasa Corporal
                    </Link>
                    <Link href="/salud/pafi/" className="pill-link pill-health">
                      Calculadora PaFi
                    </Link>
                  </div>
                </div>

                {/* Geometría Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📐</span>
                    <h3 className="text-xl font-bold text-gray-900">Geometría</h3>
                  </div>
                  <div className="pills-container">
                    <Link href="/geometria/circulo/" className="pill-link pill-geometry">
                      Área y Perímetro del Círculo
                    </Link>
                    <Link href="/geometria/rectangulo/" className="pill-link pill-geometry">
                      Área y Perímetro del Rectángulo
                    </Link>
                    <Link href="/geometria/triangulo/" className="pill-link pill-geometry">
                      Área del Triángulo
                    </Link>
                    <Link href="/geometria/cuadrado/" className="pill-link pill-geometry">
                      Área y Perímetro del Cuadrado
                    </Link>
                  </div>
                </div>

                {/* Otras Calculadoras Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🔧</span>
                    <h3 className="text-xl font-bold text-gray-900">Otras Calculadoras</h3>
                  </div>
                  <div className="pills-container">
                    <Link href="/otras/escala-notas/" className="pill-link pill-other">
                      Escala de Notas
                    </Link>
                    <Link href="/otras/gasto-gasolina/" className="pill-link pill-other">
                      Gasto Gasolina para Viajes
                    </Link>
                    <Link href="/otras/contador-palabras/" className="pill-link pill-other">
                      Contador de Palabras y Caracteres
                    </Link>
                    <Link href="/otras/numeros-romanos/" className="pill-link pill-other">
                      Conversor de Números Romanos
                    </Link>
                    <Link href="/otras/contador-clicks/" className="pill-link pill-other">
                      Contador de Clicks (CPS Test)
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

