import { Metadata } from 'next'
import { Calculator, BookOpen, Users } from 'lucide-react'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FAQ } from '@/components/FAQ'
import { buildMeta, jsonLdCollection } from '@/lib/seo'
import { SITE, getBreadcrumbs } from '@/lib/site.config'
import Link from 'next/link'
import { GeometriaClient } from './GeometriaClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Geometría – Áreas y Perímetros Online',
  description: 'Calculadoras geométricas para calcular áreas, perímetros y propiedades de figuras planas: círculos, rectángulos, triángulos, cuadrados, rombos y trapecios.',
  keywords: [
    'calculadoras geometría',
    'área círculo',
    'perímetro rectángulo',
    'área triángulo',
    'área cuadrado',
    'área rombo',
    'área trapecio',
    'figuras geométricas',
    'matemáticas',
    'geometría plana'
  ]
})

export default function GeometriaPage() {
  const geometriaCluster = SITE.clusters.geometria
  const calculators = geometriaCluster.calculators

  const faqItems = [
    {
      question: "¿Son gratuitas todas las calculadoras de geometría?",
      answer: "Sí, todas nuestras calculadoras geométricas son completamente gratuitas. No requieren registro ni tienen límites de uso."
    },
    {
      question: "¿Qué figuras geométricas puedo calcular?",
      answer: "Ofrecemos calculadoras para círculos, rectángulos, triángulos, cuadrados, rombos y trapecios. Cada una incluye múltiples métodos de cálculo."
    },
    {
      question: "¿Cómo funcionan las fórmulas mostradas?",
      answer: "Cada calculadora muestra las fórmulas utilizadas y el proceso paso a paso para que puedas entender cómo se llega al resultado."
    },
    {
      question: "¿Puedo calcular con diferentes unidades de medida?",
      answer: "Las calculadoras trabajan con las unidades que ingreses (cm, m, pulgadas, etc.) y muestran los resultados en las mismas unidades."
    },
    {
      question: "¿Los resultados son precisos?",
      answer: "Sí, utilizamos fórmulas matemáticas precisas y probadas. Para cálculos críticos siempre recomendamos verificar los resultados manualmente."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Calculadoras de Geometría',
            description: geometriaCluster.description,
            url: '/geometria/',
            calculators: calculators.map(calc => ({
              name: calc.label,
              url: calc.href,
              description: calc.description
            }))
          })),
        }}
      />

      <Container>
        <div className="py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={getBreadcrumbs('/geometria/')} />

          {/* Header - Mejorado con nuevo branding */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
              Calculadoras de Geometría
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {geometriaCluster.description}
            </p>
            <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Stats - Mejorado con nuevo branding */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center calculator-card shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-blue-600 mb-2">{calculators.length}</CardTitle>
                <CardDescription className="text-lg text-gray-600">Calculadoras Disponibles</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center calculator-card shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-green-600 mb-2">6</CardTitle>
                <CardDescription className="text-lg text-gray-600">Figuras Geométricas</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center calculator-card shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-purple-600 mb-2">100%</CardTitle>
                <CardDescription className="text-lg text-gray-600">Gratuito</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Client Component with Filtering */}
          <GeometriaClient calculators={calculators} />

          {/* FAQ */}
          <section className="mb-12">
            <FAQ 
              items={faqItems}
              title="Preguntas Frecuentes sobre Calculadoras de Geometría"
              description="Respuestas a las dudas más comunes sobre nuestras calculadoras geométricas"
            />
          </section>

          {/* CTA - Mejorado con nuevo branding */}
          <Card className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardHeader className="pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Calculator className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                ¿Necesitas una calculadora específica?
              </CardTitle>
              <CardDescription className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Si no encuentras la calculadora que necesitas, contáctanos y la agregaremos a nuestra colección
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/contacto/">
                  Solicitar Calculadora
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  )
}
