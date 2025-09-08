import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { buildMeta, jsonLdWebSite } from '@/lib/seo'
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

            {/* Calculator Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-8">
                
                {/* Calculadoras Matemáticas */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Calculadoras Matemáticas</h2>
                  <div className="space-y-3">
                    <Link href="/matematicas/porcentajes/" className="category-button category-math">
                      Calcular Porcentaje
                    </Link>
                    <Link href="/matematicas/fracciones/" className="category-button category-math">
                      Calculadora de Fracciones
                    </Link>
                    <Link href="/matematicas/algebra/" className="category-button category-math">
                      Calculadora de Álgebra
                    </Link>
                    <Link href="/matematicas/trig/" className="category-button category-math">
                      Calculadora Trigonométrica
                    </Link>
                    <Link href="/matematicas/calculus/" className="category-button category-math">
                      Calculadora de Derivadas
                    </Link>
                    <Link href="/matematicas/matrices/" className="category-button category-math">
                      Calculadora de Matrices
                    </Link>
                    <Link href="/matematicas/combinatorics/" className="category-button category-math">
                      Calculadora Combinatoria
                    </Link>
                  </div>
                </div>

                {/* Calculadoras de Calendario */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Calculadoras de Calendario</h2>
                  <div className="space-y-3">
                    <Link href="/calendario/dias-entre-fechas/" className="category-button category-calendar">
                      Contador de Días entre Fechas
                    </Link>
                    <Link href="/calendario/calculadora-edad/" className="category-button category-calendar">
                      Calculadora de Edad
                    </Link>
                    <Link href="/calendario/sumar-restar-dias/" className="category-button category-calendar">
                      Sumar/Restar Días a una Fecha
                    </Link>
                    <Link href="/calendario/horas-minutos/" className="category-button category-calendar">
                      Calculadora de Horas y Minutos
                    </Link>
                    <Link href="/calendario/dias-vacaciones/" className="category-button category-calendar">
                      Días de Vacaciones (Feriado Legal)
                    </Link>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-8">
                
                {/* Calculadoras de Salud */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Calculadoras de Salud</h2>
                  <div className="space-y-3">
                    <Link href="/salud/imc/" className="category-button category-health">
                      Índice Masa Corporal (IMC)
                    </Link>
                    <Link href="/salud/tmb/" className="category-button category-health">
                      Tasa Metabólica Basal (TMB)
                    </Link>
                    <Link href="/salud/grasa-corporal/" className="category-button category-health">
                      Porcentaje Grasa Corporal
                    </Link>
                    <Link href="/salud/pafi/" className="category-button category-health">
                      Calculadora PaFi
                    </Link>
                  </div>
                </div>

                {/* Otras Calculadoras */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Otras Calculadoras</h2>
                  <div className="space-y-3">
                    <Link href="/otras/escala-notas/" className="category-button category-other">
                      Escala de Notas
                    </Link>
                    <Link href="/otras/gasto-gasolina/" className="category-button category-other">
                      Gasto Gasolina para Viajes
                    </Link>
                    <Link href="/otras/contador-palabras/" className="category-button category-other">
                      Contador de Palabras y Caracteres
                    </Link>
                    <Link href="/otras/numeros-romanos/" className="category-button category-other">
                      Conversor de Números Romanos
                    </Link>
                    <Link href="/otras/contador-clicks/" className="category-button category-other">
                      Contador de Clicks (CPS Test)
                    </Link>
                  </div>
                </div>

                {/* Calculadoras de Geometría */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Calculadoras de Geometría</h2>
                  <div className="space-y-3">
                    <Link href="/geometria/circulo/" className="category-button category-geometry">
                      Área y Perímetro del Círculo
                    </Link>
                    <Link href="/geometria/rectangulo/" className="category-button category-geometry">
                      Área y Perímetro del Rectángulo
                    </Link>
                    <Link href="/geometria/triangulo/" className="category-button category-geometry">
                      Área del Triángulo
                    </Link>
                    <Link href="/geometria/cuadrado/" className="category-button category-geometry">
                      Área y Perímetro del Cuadrado
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
