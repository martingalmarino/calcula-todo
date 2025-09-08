import { Metadata } from 'next'
import { Calculator, BookOpen, Users } from 'lucide-react'
import { Container } from '@/components/Container'
import { CardCalculator } from '@/components/CardCalculator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Pill } from '@/components/Pill'
import { FAQ } from '@/components/FAQ'
import { buildMeta, jsonLdCollection } from '@/lib/seo'
import { SITE } from '@/lib/site.config'
import Link from 'next/link'
import { MatematicasClient } from './MatematicasClient'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Matemáticas – Resuelve operaciones online',
  description: 'Fracciones, porcentajes, potencias y raíces, álgebra, trigonometría, derivadas, integrales, matrices, combinatoria, progresiones y logaritmos.',
  canonical: '/matematicas/',
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
          <Breadcrumbs 
            items={[
              { label: 'Matemáticas', href: '/matematicas/', current: true }
            ]} 
            className="mb-8"
          />

          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="hero-title">
              Calculadoras de Matemáticas
            </h1>
            <p className="hero-subtitle max-w-3xl mx-auto">
              {matematicasCluster.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center calculator-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">{calculators.length}</CardTitle>
                <CardDescription className="text-gray-600">Calculadoras Disponibles</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center calculator-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">6+</CardTitle>
                <CardDescription className="text-gray-600">Categorías Matemáticas</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center calculator-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">100%</CardTitle>
                <CardDescription className="text-gray-600">Gratuito</CardDescription>
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

          {/* CTA */}
          <Card className="text-center bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                ¿Necesitas una calculadora específica?
              </CardTitle>
              <CardDescription className="text-lg text-gray-700 max-w-2xl mx-auto">
                Si no encuentras la calculadora que necesitas, contáctanos y la agregaremos a nuestra colección
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold">
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
