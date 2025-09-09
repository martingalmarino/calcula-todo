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
import { MatematicasClient } from './MatematicasClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Matemáticas – Resuelve operaciones online',
  description: 'Fracciones, porcentajes, potencias y raíces, álgebra, trigonometría, derivadas, integrales, matrices, combinatoria, progresiones y logaritmos.',
  keywords: [
    'calculadoras matemáticas',
    'fracciones',
    'porcentajes',
    'potencias',
    'raíces',
    'álgebra',
    'trigonometría',
    'derivadas',
    'integrales',
    'matrices',
    'combinatoria',
    'progresiones',
    'logaritmos',
    'ecuaciones',
    'matemáticas online'
  ]
})

export default function MatematicasPage() {
  const matematicasCluster = SITE.clusters.matematicas
  const calculators = matematicasCluster.calculators

  const faqItems = [
    {
      question: "¿Son gratuitas todas las calculadoras?",
      answer: "Sí, todas nuestras calculadoras matemáticas son completamente gratuitas. No requieren registro ni tienen límites de uso."
    },
    {
      question: "¿Cómo funcionan las explicaciones paso a paso?",
      answer: "Cada calculadora muestra el proceso completo de resolución, incluyendo las fórmulas utilizadas y cada paso del cálculo para que puedas entender cómo se llega al resultado."
    },
    {
      question: "¿Puedo usar estas calculadoras en mi tarea o examen?",
      answer: "Nuestras calculadoras son herramientas educativas. Te recomendamos verificar con tu profesor si está permitido su uso en tareas o exámenes específicos."
    },
    {
      question: "¿Qué tipos de problemas matemáticos puedo resolver?",
      answer: "Ofrecemos calculadoras para aritmética básica, álgebra, trigonometría, cálculo, álgebra lineal, combinatoria, progresiones y logaritmos. Cubrimos desde nivel básico hasta universitario."
    },
    {
      question: "¿Los resultados son precisos?",
      answer: "Sí, utilizamos algoritmos matemáticos precisos y probados. Sin embargo, para cálculos críticos siempre recomendamos verificar los resultados manualmente."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Calculadoras de Matemáticas',
            description: matematicasCluster.description,
            url: '/matematicas/',
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
          <Breadcrumbs items={getBreadcrumbs('/matematicas/')} />

          {/* Header - Mejorado con nuevo branding */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
              Calculadoras de Matemáticas
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {matematicasCluster.description}
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
                <CardTitle className="text-4xl font-bold text-green-600 mb-2">6+</CardTitle>
                <CardDescription className="text-lg text-gray-600">Categorías Matemáticas</CardDescription>
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
          <MatematicasClient calculators={calculators} />

          {/* FAQ */}
          <section className="mb-12">
            <FAQ 
              items={faqItems}
              title="Preguntas Frecuentes sobre Calculadoras Matemáticas"
              description="Respuestas a las dudas más comunes sobre nuestras calculadoras"
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
