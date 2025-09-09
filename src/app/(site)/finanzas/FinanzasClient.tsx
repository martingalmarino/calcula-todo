"use client"

import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FAQ } from '@/components/FAQ'
import { buildMeta, jsonLdCollection } from '@/lib/seo'
import { SITE, getBreadcrumbs } from '@/lib/site.config'
import Link from 'next/link'
import { Calculator, TrendingUp, Home, Car, Target, DollarSign } from 'lucide-react'

const finanzasCluster = SITE.clusters.finanzas

export default function FinanzasClient() {
  const calculators = finanzasCluster.calculators

  const faqItems = [
    {
      question: "¿Qué es el interés simple?",
      answer: "El interés simple es el interés que se calcula únicamente sobre el capital inicial, sin considerar los intereses acumulados de períodos anteriores. Es ideal para préstamos cortos y operaciones simples."
    },
    {
      question: "¿Cómo se calcula la depreciación de un vehículo?",
      answer: "La depreciación se calcula considerando el valor inicial del vehículo, su vida útil estimada y el método de depreciación (lineal, acelerada, etc.). Nuestra calculadora usa métodos estándar del mercado."
    },
    {
      question: "¿Qué incluye el cálculo de hipoteca?",
      answer: "El cálculo de hipoteca incluye el desglose mensual de capital e intereses, el total de intereses a pagar, y el cronograma de pagos para ayudarte a planificar tu presupuesto."
    },
    {
      question: "¿Para qué sirve el IPC?",
      answer: "El Índice de Precios al Consumidor (IPC) mide la inflación y te ayuda a calcular el poder adquisitivo del dinero en el tiempo, esencial para planificación financiera."
    },
    {
      question: "¿Cómo funciona la calculadora de ahorro objetivo?",
      answer: "Te ayuda a determinar cuánto necesitas ahorrar mensualmente para alcanzar una meta financiera específica en un tiempo determinado, considerando la tasa de interés."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Calculadoras de Finanzas',
            description: finanzasCluster.description,
            url: '/finanzas/',
            calculators: calculators.map(calc => ({
              name: calc.label,
              url: calc.href,
              description: `Calculadora de ${calc.label.toLowerCase()} - ${finanzasCluster.description}`
            }))
          }))
        }}
      />

      <Container>
        <div className="py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={getBreadcrumbs('/finanzas/')} />

          {/* Header - Mejorado con nuevo branding */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
              Calculadoras de Finanzas
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {finanzasCluster.description}
            </p>
            <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-green-600 mb-2">100%</CardTitle>
                <CardDescription className="text-lg text-gray-600">Gratuitas</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center calculator-card shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-purple-600 mb-2">Precisas</CardTitle>
                <CardDescription className="text-lg text-gray-600">Cálculos Financieros</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Calculadoras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {calculators.map((calculator) => {
              const getIcon = (href: string) => {
                if (href.includes('interes-simple')) return <TrendingUp className="h-6 w-6" />
                if (href.includes('hipoteca')) return <Home className="h-6 w-6" />
                if (href.includes('depreciacion')) return <Car className="h-6 w-6" />
                if (href.includes('ahorro')) return <Target className="h-6 w-6" />
                return <Calculator className="h-6 w-6" />
              }

              return (
                <Card key={calculator.href} className="calculator-card shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        {getIcon(calculator.href)}
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {calculator.label}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild className="w-full calculator-button">
                      <Link href={calculator.href}>
                        Usar Calculadora
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <Card className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardHeader className="pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Calculator className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                ¿Necesitas una calculadora financiera específica?
              </CardTitle>
              <CardDescription className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Si no encuentras la calculadora financiera que necesitas, contáctanos y la agregaremos a nuestra colección
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

          {/* FAQ */}
          <div className="mt-16">
            <FAQ items={faqItems} />
          </div>
        </div>
      </Container>
    </>
  )
}
