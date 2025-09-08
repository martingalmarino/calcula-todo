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
  const subcategories = matematicasCluster.subcategories || []

  // Agrupar calculadoras por categoría
  const calculatorsByCategory = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = []
    }
    acc[calc.category].push(calc)
    return acc
  }, {} as Record<string, typeof calculators>)

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
            <h1 className="text-4xl md:text-5xl font-bold">
              Calculadoras de Matemáticas
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {matematicasCluster.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{calculators.length}</CardTitle>
                <CardDescription>Calculadoras Disponibles</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">6+</CardTitle>
                <CardDescription>Categorías Matemáticas</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">100%</CardTitle>
                <CardDescription>Gratuito</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Pill active>Todas</Pill>
            {Object.keys(calculatorsByCategory).map((category) => (
              <Pill key={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Pill>
            ))}
          </div>

          {/* Calculators by Category */}
          {Object.entries(calculatorsByCategory).map(([category, categoryCalculators]) => (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryCalculators.map((calculator) => (
                  <CardCalculator
                    key={calculator.href}
                    title={calculator.label}
                    description={calculator.description}
                    href={calculator.href}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                Subcategorías Especializadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => (
                  <Card key={subcategory.href} className="group hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {subcategory.label}
                      </CardTitle>
                      <CardDescription>
                        {subcategory.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={subcategory.href}>
                          Explorar
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All Calculators Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Todas las Calculadoras
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calculator) => (
                <CardCalculator
                  key={calculator.href}
                  title={calculator.label}
                  description={calculator.description}
                  href={calculator.href}
                />
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <FAQ 
              items={faqItems}
              title="Preguntas Frecuentes sobre Calculadoras Matemáticas"
              description="Respuestas a las dudas más comunes sobre nuestras calculadoras"
            />
          </section>

          {/* CTA */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">
                ¿Necesitas una calculadora específica?
              </CardTitle>
              <CardDescription className="text-lg">
                Si no encuentras la calculadora que necesitas, contáctanos y la agregaremos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild>
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
