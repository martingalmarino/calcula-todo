import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Chip, ChipsContainer } from '@/components/Chip'
import { buildMeta, jsonLdWebSite } from '@/lib/seo'
import { SITE } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Online Gratuitas',
  description: 'Facilitamos tus cálculos en temas de finanzas, salud, matemática, calendario, geometría y más. Calculadoras online gratuitas, rápidas y amigables.',
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
              <h1 className="text-blue-600 text-4xl md:text-5xl font-bold mb-6">
                Calculadoras Online Gratuitas
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
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
                    className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200 group relative overflow-hidden"
                  >
                    {/* Línea lateral izquierda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 group-hover:bg-blue-500 transition-colors duration-200"></div>
                    <span className="text-gray-700 text-lg font-bold ml-2">Calculadora de {calculator.label}</span>
                    <span className="text-gray-400 text-xl font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {mathCalculators.slice(5, 10).map((calculator) => (
                  <Link 
                    key={calculator.href}
                    href={calculator.href} 
                    className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200 group relative overflow-hidden"
                  >
                    {/* Línea lateral izquierda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 group-hover:bg-blue-500 transition-colors duration-200"></div>
                    <span className="text-gray-700 text-lg font-bold ml-2">Calculadora de {calculator.label}</span>
                    <span className="text-gray-400 text-xl font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Additional Categories Section - New Responsive Design */}
            <div className="mt-20 bg-gray-50 py-16 -mx-4 px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-blue-900 text-2xl font-bold text-center mb-12">
                  Más Calculadoras por Categoría
                </h2>
              
              {/* Categories Grid - Responsive */}
              <div className="space-y-12">
                
                {/* Calendario Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📅</span>
                    <h3 className="text-blue-900 text-xl font-bold">Calendario</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/calendario/dias-entre-fechas/" icon="calendar" ariaLabel="Contador de Días entre Fechas">
                      Contador de Días entre Fechas
                    </Chip>
                    <Chip href="/calendario/calculadora-edad/" icon="user-round" ariaLabel="Calculadora de Edad">
                      Calculadora de Edad
                    </Chip>
                    <Chip href="/calendario/sumar-restar-dias/" icon="plus-minus" ariaLabel="Sumar/Restar Días a una Fecha">
                      Sumar/Restar Días a una Fecha
                    </Chip>
                    <Chip href="/calendario/horas-minutos/" icon="clock-8" ariaLabel="Calculadora de Horas y Minutos">
                      Calculadora de Horas y Minutos
                    </Chip>
                    <Chip href="/calendario/dias-vacaciones/" icon="calendar-days" ariaLabel="Días de Vacaciones">
                      Días de Vacaciones
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Salud Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-blue-900 text-xl font-bold">Salud</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/salud/imc/" icon="heart-pulse" ariaLabel="Índice Masa Corporal (IMC)">
                      Índice Masa Corporal (IMC)
                    </Chip>
                    <Chip href="/salud/tmb/" icon="flame" ariaLabel="Tasa Metabólica Basal (TMB)">
                      Tasa Metabólica Basal (TMB)
                    </Chip>
                    <Chip href="/salud/grasa-corporal/" icon="percent" ariaLabel="Porcentaje Grasa Corporal">
                      Porcentaje Grasa Corporal
                    </Chip>
                    <Chip href="/salud/pafi/" icon="users-round" ariaLabel="Calculadora PaFi">
                      Calculadora PaFi
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Geometría Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📐</span>
                    <h3 className="text-blue-900 text-xl font-bold">Geometría</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/geometria/circulo/" icon="circle" ariaLabel="Área y Perímetro del Círculo">
                      Área y Perímetro del Círculo
                    </Chip>
                    <Chip href="/geometria/rectangulo/" icon="rectangle-horizontal" ariaLabel="Área y Perímetro del Rectángulo">
                      Área y Perímetro del Rectángulo
                    </Chip>
                    <Chip href="/geometria/triangulo/" icon="triangle" ariaLabel="Área del Triángulo">
                      Área del Triángulo
                    </Chip>
                    <Chip href="/geometria/cuadrado/" icon="square" ariaLabel="Área y Perímetro del Cuadrado">
                      Área y Perímetro del Cuadrado
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Otras Calculadoras Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🔧</span>
                    <h3 className="text-blue-900 text-xl font-bold">Otras Calculadoras</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/otras/escala-notas/" icon="graduation-cap" ariaLabel="Escala de Notas">
                      Escala de Notas
                    </Chip>
                    <Chip href="/otras/gasto-gasolina/" icon="fuel" ariaLabel="Gasto Gasolina para Viajes">
                      Gasto Gasolina para Viajes
                    </Chip>
                    <Chip href="/otras/contador-palabras/" icon="type" ariaLabel="Contador de Palabras y Caracteres">
                      Contador de Palabras y Caracteres
                    </Chip>
                    <Chip href="/otras/numeros-romanos/" icon="hash" ariaLabel="Conversor de Números Romanos">
                      Conversor de Números Romanos
                    </Chip>
                    <Chip href="/otras/contador-clicks/" icon="mouse-pointer" ariaLabel="Contador de Clicks (CPS Test)">
                      Contador de Clicks (CPS Test)
                    </Chip>
                  </ChipsContainer>
                </div>

              </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <div className="mt-20 mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed mb-4">
                      Encuentra las mejores calculadoras online gratuitas para resolver operaciones de matemáticas, finanzas, salud, estadísticas y geometría en segundos. Nuestro objetivo es que realices tus cálculos de forma rápida, precisa y sencilla, sin necesidad de instalar nada en tu dispositivo.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Con más de 30 calculadoras especializadas, podrás desde calcular porcentajes y fracciones, hasta estimar tu índice de masa corporal o resolver problemas de álgebra y trigonometría.
                    </p>
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

