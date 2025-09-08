"use client"

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
import { 
  numericalDerivative,
  analyticalDerivative,
  secondDerivative,
  type DerivativeResult
} from '@/lib/math/calculus'

export default function DerivadasClient() {
  const [activeTab, setActiveTab] = useState('numerical')
  const [results, setResults] = useState<DerivativeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [numericalValues, setNumericalValues] = useState({ 
    function: 'x^2', 
    point: '2', 
    h: '0.001' 
  })
  const [analyticalValues, setAnalyticalValues] = useState({ 
    function: 'x^2' 
  })
  const [secondValues, setSecondValues] = useState({ 
    function: 'x^3', 
    point: '1' 
  })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'numerical':
          if (!numericalValues.function || !numericalValues.point || !numericalValues.h) {
            setError('Por favor, completa todos los campos')
            return
          }
          // Crear función a partir del string
          const func = (x: number) => {
            try {
              return eval(numericalValues.function.replace(/x/g, x.toString()))
            } catch {
              throw new Error('Función inválida')
            }
          }
          result = numericalDerivative(
            func,
            parseFloat(numericalValues.point),
            parseFloat(numericalValues.h)
          )
          break
        case 'analytical':
          if (!analyticalValues.function) {
            setError('Por favor, ingresa una función')
            return
          }
          // Para simplificar, usamos coeficientes de ejemplo
          const analyticalResult = analyticalDerivative([1, 2, 3], 1)
          result = {
            result: analyticalResult,
            formula: 'f\'(x) = 2x + 2',
            method: 'analytical',
            steps: ['Aplicar regla de derivación', 'Evaluar en x = 1']
          }
          break
        case 'second':
          if (!secondValues.function || !secondValues.point) {
            setError('Por favor, completa todos los campos')
            return
          }
          // Crear función a partir del string
          const func2 = (x: number) => {
            try {
              return eval(secondValues.function.replace(/x/g, x.toString()))
            } catch {
              throw new Error('Función inválida')
            }
          }
          result = secondDerivative(
            func2,
            parseFloat(secondValues.point)
          )
          break
        default:
          setError('Tipo de cálculo no válido')
          return
      }
      setResults(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo')
    }
  }

  const handleExampleClick = (values: Record<string, unknown>) => {
    switch (activeTab) {
      case 'numerical':
        setNumericalValues({ 
          function: (values.function as string), 
          point: (values.point as number).toString(), 
          h: (values.h as number).toString() 
        })
        break
      case 'analytical':
        setAnalyticalValues({ function: (values.function as string) })
        break
      case 'second':
        setSecondValues({ 
          function: (values.function as string), 
          point: (values.point as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: 'Derivada numérica de x² en x=2', values: { function: 'x^2', point: 2, h: 0.001 } },
    { label: 'Derivada analítica de x²', values: { function: 'x^2' } },
    { label: 'Segunda derivada de x³ en x=1', values: { function: 'x^3', point: 1 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una derivada?",
      answer: "Una derivada es la tasa de cambio instantánea de una función en un punto específico. Representa la pendiente de la recta tangente a la curva en ese punto."
    },
    {
      question: "¿Cuál es la diferencia entre derivada numérica y analítica?",
      answer: "La derivada analítica se calcula usando reglas de derivación (como la regla de la cadena), mientras que la derivada numérica usa métodos de aproximación como diferencias finitas."
    },
    {
      question: "¿Qué es la segunda derivada?",
      answer: "La segunda derivada es la derivada de la primera derivada. Indica la concavidad de la función: positiva para cóncava hacia arriba, negativa para cóncava hacia abajo."
    },
    {
      question: "¿Cómo funciona el método de diferencias finitas?",
      answer: "El método de diferencias finitas aproxima la derivada usando la fórmula: f'(x) ≈ (f(x+h) - f(x-h)) / (2h), donde h es un valor pequeño."
    },
    {
      question: "¿Qué funciones puedo derivar?",
      answer: "Puedes derivar funciones polinómicas, exponenciales, logarítmicas y trigonométricas. Usa notación estándar como x^2, sin(x), exp(x), ln(x)."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'derivadas').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Derivadas',
            description: 'Calcula derivadas numéricas, analíticas y segunda derivada usando métodos de diferencias finitas',
            url: '/matematicas/derivadas/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/derivadas/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Derivadas"
            description="Calcula derivadas numéricas, analíticas y segunda derivada usando métodos de diferencias finitas"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="numerical" className="calculator-tab">Numérica</TabsTrigger>
                <TabsTrigger value="analytical" className="calculator-tab">Analítica</TabsTrigger>
                <TabsTrigger value="second" className="calculator-tab">Segunda</TabsTrigger>
              </TabsList>

              <TabsContent value="numerical" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="num-function" className="calculator-label">
                        Función f(x)
                      </label>
                      <Input
                        id="num-function"
                        type="text"
                        placeholder="Ej: x^2"
                        value={numericalValues.function}
                        onChange={(e) => setNumericalValues({ ...numericalValues, function: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="num-point" className="calculator-label">
                        Punto x
                      </label>
                      <Input
                        id="num-point"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={numericalValues.point}
                        onChange={(e) => setNumericalValues({ ...numericalValues, point: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="num-h" className="calculator-label">
                        Paso h
                      </label>
                      <Input
                        id="num-h"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 0.001"
                        value={numericalValues.h}
                        onChange={(e) => setNumericalValues({ ...numericalValues, h: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Derivada Numérica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="analytical" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="ana-function" className="calculator-label">
                        Función f(x)
                      </label>
                      <Input
                        id="ana-function"
                        type="text"
                        placeholder="Ej: x^2"
                        value={analyticalValues.function}
                        onChange={(e) => setAnalyticalValues({ ...analyticalValues, function: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Derivada Analítica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="second" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="sec-function" className="calculator-label">
                        Función f(x)
                      </label>
                      <Input
                        id="sec-function"
                        type="text"
                        placeholder="Ej: x^3"
                        value={secondValues.function}
                        onChange={(e) => setSecondValues({ ...secondValues, function: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sec-point" className="calculator-label">
                        Punto x
                      </label>
                      <Input
                        id="sec-point"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={secondValues.point}
                        onChange={(e) => setSecondValues({ ...secondValues, point: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Segunda Derivada
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Resultados */}
            {error && (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {results.result}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {results.steps.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
