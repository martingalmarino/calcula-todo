"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
import { calcularInteresSimple } from '@/lib/math/finance'

export default function InteresSimpleClient() {
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [resultado, setResultado] = useState<{
    capital: number;
    tasa: number;
    tiempo: number;
    interes: number;
    montoTotal: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    try {
      const capitalNum = parseFloat(capital)
      const tasaNum = parseFloat(tasa) / 100 // Convertir porcentaje a decimal
      const tiempoNum = parseFloat(tiempo)

      if (isNaN(capitalNum) || isNaN(tasaNum) || isNaN(tiempoNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      if (capitalNum <= 0 || tasaNum <= 0 || tiempoNum <= 0) {
        setError('Todos los valores deben ser mayores a cero')
        return
      }

      const resultado = calcularInteresSimple(capitalNum, tasaNum, tiempoNum)
      setResultado(resultado)
    } catch {
      setError('Error al calcular. Verifica los valores ingresados.')
    }
  }

  const examples = [
    {
      label: 'Préstamo personal de $10,000 al 12% anual por 2 años',
      values: { capital: '10000', tasa: '12', tiempo: '2' }
    },
    {
      label: 'Descuento por pago anticipado: $5,000 al 8% por 6 meses',
      values: { capital: '5000', tasa: '8', tiempo: '0.5' }
    },
    {
      label: 'Inversión simple: $15,000 al 6% anual por 3 años',
      values: { capital: '15000', tasa: '6', tiempo: '3' }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es el interés simple?",
      answer: "El interés simple es el interés que se calcula únicamente sobre el capital inicial, sin considerar los intereses acumulados de períodos anteriores. Es ideal para préstamos cortos y operaciones simples."
    },
    {
      question: "¿Cuál es la fórmula del interés simple?",
      answer: "La fórmula es: I = C × r × t, donde I es el interés, C es el capital, r es la tasa de interés y t es el tiempo."
    },
    {
      question: "¿Cuándo se usa el interés simple?",
      answer: "Se usa principalmente para préstamos entre particulares, descuentos por pago anticipado, deudas básicas y operaciones financieras de corto plazo."
    },
    {
      question: "¿Cómo se diferencia del interés compuesto?",
      answer: "El interés simple se calcula solo sobre el capital inicial, mientras que el interés compuesto se calcula sobre el capital más los intereses acumulados."
    }
  ]

  const relatedLinks = getRelatedCalculators('finanzas', 'interes-simple').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }))

  const handleExampleClick = (values: Record<string, unknown>) => {
    setCapital(values.capital as string)
    setTasa(values.tasa as string)
    setTiempo(values.tiempo as string)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Interés Simple',
            description: 'Calcula el interés simple para préstamos cortos, descuentos y deudas básicas',
            url: '/finanzas/interes-simple/',
            category: 'finanzas'
          }))
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs items={getBreadcrumbs('/finanzas/interes-simple/')} />

          <CalculatorLayout
            title="Calculadora de Interés Simple"
            description="Calcula el interés simple para préstamos cortos, descuentos y deudas básicas"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="calculator-label">
                    Capital Inicial ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ej: 10000"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="calculator-input"
                  />
                </div>

                <div>
                  <label className="calculator-label">
                    Tasa de Interés Anual (%)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ej: 12"
                    value={tasa}
                    onChange={(e) => setTasa(e.target.value)}
                    className="calculator-input"
                  />
                </div>

                <div>
                  <label className="calculator-label">
                    Tiempo (años)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ej: 2"
                    value={tiempo}
                    onChange={(e) => setTiempo(e.target.value)}
                    className="calculator-input"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Calculate Button */}
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Interés Simple
              </Button>

              {/* Results */}
              {resultado && (
                <div className="space-y-4">
                  <Card className="calculator-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Resultados del Cálculo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Capital Inicial</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            ${resultado.capital.toLocaleString()}
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Interés Generado</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            ${resultado.interes.toLocaleString()}
                          </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Tasa Anual</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">
                            {resultado.tasa.toFixed(2)}%
                          </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-orange-600" />
                            <span className="font-medium text-orange-800">Monto Total</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-900">
                            ${resultado.montoTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Fórmula */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Fórmula utilizada:</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Interés = Capital × Tasa × Tiempo</strong>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          ${resultado.capital.toLocaleString()} × {resultado.tasa.toFixed(2)}% × {resultado.tiempo} años = ${resultado.interes.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
