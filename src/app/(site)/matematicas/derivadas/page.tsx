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
  secondDerivative,
  analyticalDerivative
} from '@/lib/math/calculus'

export default function DerivadasPage() {
  const [activeTab, setActiveTab] = useState('numerical')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
    method: string;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [numericalValues, setNumericalValues] = useState({ 
    function: 'x^2', 
    x0: '', 
    h: '0.001' 
  })
  const [analyticalValues, setAnalyticalValues] = useState({ 
    coefficients: '', 
    x: '' 
  })
  const [secondDerivativeValues, setSecondDerivativeValues] = useState({ 
    function: 'x^2', 
    x0: '', 
    h: '0.001' 
  })

  const parseFunction = (funcStr: string): ((x: number) => number) => {
    try {
      // Reemplazar notaciones comunes
      const cleanFunc = funcStr
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/exp/g, 'Math.exp')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      return new Function('x', `return ${cleanFunc}`) as (x: number) => number;
    } catch (error) {
      throw new Error('Función inválida. Use notación como: x^2, sin(x), cos(x), etc.');
    }
  }

  const parseCoefficients = (coeffStr: string): number[] => {
    const coeffs = coeffStr.split(',').map(c => parseFloat(c.trim()));
    if (coeffs.some(isNaN)) {
      throw new Error('Coeficientes inválidos. Use formato: a0, a1, a2, ...');
    }
    return coeffs;
  }

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'numerical':
          if (!numericalValues.function || !numericalValues.x0) {
            setError('Por favor, completa todos los campos')
            return
          }
          const func = parseFunction(numericalValues.function)
          const x0 = Number(numericalValues.x0)
          const h = Number(numericalValues.h)
          result = numericalDerivative(func, x0, h)
          break
        case 'analytical':
          if (!analyticalValues.coefficients || !analyticalValues.x) {
            setError('Por favor, completa todos los campos')
            return
          }
          const coefficients = parseCoefficients(analyticalValues.coefficients)
          const x = Number(analyticalValues.x)
          const analyticalResult = analyticalDerivative(coefficients, x)
          result = {
            result: analyticalResult,
            formula: `f'(x) = ${coefficients.slice(1).map((c, i) => `${(i+1)*c}x^${i}`).join(' + ')}`,
            steps: [
              `Polinomio: f(x) = ${coefficients.map((c, i) => `${c}x^${i}`).join(' + ')}`,
              `Derivada: f'(x) = ${coefficients.slice(1).map((c, i) => `${(i+1)*c}x^${i}`).join(' + ')}`,
              `Evaluando en x = ${x}:`,
              `f'(${x}) = ${analyticalResult}`
            ],
            method: 'derivada analítica'
          }
          break
        case 'second':
          if (!secondDerivativeValues.function || !secondDerivativeValues.x0) {
            setError('Por favor, completa todos los campos')
            return
          }
          const func2 = parseFunction(secondDerivativeValues.function)
          const x02 = Number(secondDerivativeValues.x0)
          const h2 = Number(secondDerivativeValues.h)
          result = secondDerivative(func2, x02, h2)
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
          function: (values.function as string) || '', 
          x0: (values.x0 as number).toString(), 
          h: (values.h as number).toString() 
        })
        break
      case 'analytical':
        setAnalyticalValues({ 
          coefficients: (values.coefficients as string) || '', 
          x: (values.x as number).toString() 
        })
        break
      case 'second':
        setSecondDerivativeValues({ 
          function: (values.function as string) || '', 
          x0: (values.x0 as number).toString(), 
          h: (values.h as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: 'x² en x=2', values: { function: 'x^2', x0: 2, h: 0.001 } },
    { label: 'sin(x) en x=π/4', values: { function: 'sin(x)', x0: 0.785, h: 0.001 } },
    { label: 'Polinomio 1,2,1 en x=1', values: { coefficients: '1,2,1', x: 1 } },
    { label: 'x³ en x=1 (segunda derivada)', values: { function: 'x^3', x0: 1, h: 0.001 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una derivada?",
      answer: "La derivada de una función en un punto representa la pendiente de la recta tangente a la función en ese punto. Mide la tasa de cambio instantánea de la función."
    },
    {
      question: "¿Cuál es la diferencia entre derivada numérica y analítica?",
      answer: "La derivada analítica se calcula usando las reglas de derivación (como la regla de la cadena), mientras que la derivada numérica aproxima el valor usando diferencias finitas."
    },
    {
      question: "¿Qué métodos numéricos se usan?",
      answer: "Usamos diferencias centradas (más precisas), diferencias hacia adelante y hacia atrás. Las diferencias centradas son generalmente más exactas."
    },
    {
      question: "¿Cómo interpreto el resultado?",
      answer: "El resultado te dice qué tan rápido cambia la función en ese punto. Un valor positivo indica crecimiento, negativo indica decrecimiento, y cero indica un punto crítico."
    },
    {
      question: "¿Qué es la segunda derivada?",
      answer: "La segunda derivada mide la concavidad de la función. Valores positivos indican concavidad hacia arriba, negativos hacia abajo, y cero puntos de inflexión."
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
            description: 'Calcula derivadas numéricas y analíticas de funciones con explicaciones paso a paso',
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
            description="Calcula derivadas numéricas y analíticas de funciones con explicaciones paso a paso"
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
                  <div>
                    <label htmlFor="function" className="calculator-label">
                      Función f(x)
                    </label>
                    <Input
                      id="function"
                      type="text"
                      placeholder="Ej: x^2, sin(x), cos(x), exp(x)"
                      value={numericalValues.function}
                      onChange={(e) => setNumericalValues({ ...numericalValues, function: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="x0" className="calculator-label">
                        Punto x₀
                      </label>
                      <Input
                        id="x0"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={numericalValues.x0}
                        onChange={(e) => setNumericalValues({ ...numericalValues, x0: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="h" className="calculator-label">
                        Paso h
                      </label>
                      <Input
                        id="h"
                        type="number"
                        step="0.0001"
                        placeholder="Ej: 0.001"
                        value={numericalValues.h}
                        onChange={(e) => setNumericalValues({ ...numericalValues, h: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Derivada
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="analytical" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="coefficients" className="calculator-label">
                      Coeficientes del polinomio
                    </label>
                    <Input
                      id="coefficients"
                      type="text"
                      placeholder="Ej: 1,2,1 (para x²+2x+1)"
                      value={analyticalValues.coefficients}
                      onChange={(e) => setAnalyticalValues({ ...analyticalValues, coefficients: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="x-analytical" className="calculator-label">
                      Punto x
                    </label>
                    <Input
                      id="x-analytical"
                      type="number"
                      step="0.001"
                      placeholder="Ej: 1"
                      value={analyticalValues.x}
                      onChange={(e) => setAnalyticalValues({ ...analyticalValues, x: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Derivada Analítica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="second" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="function-second" className="calculator-label">
                      Función f(x)
                    </label>
                    <Input
                      id="function-second"
                      type="text"
                      placeholder="Ej: x^3, sin(x), cos(x)"
                      value={secondDerivativeValues.function}
                      onChange={(e) => setSecondDerivativeValues({ ...secondDerivativeValues, function: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="x0-second" className="calculator-label">
                        Punto x₀
                      </label>
                      <Input
                        id="x0-second"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={secondDerivativeValues.x0}
                        onChange={(e) => setSecondDerivativeValues({ ...secondDerivativeValues, x0: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="h-second" className="calculator-label">
                        Paso h
                      </label>
                      <Input
                        id="h-second"
                        type="number"
                        step="0.0001"
                        placeholder="Ej: 0.001"
                        value={secondDerivativeValues.h}
                        onChange={(e) => setSecondDerivativeValues({ ...secondDerivativeValues, h: e.target.value })}
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
                    f&apos;({activeTab === 'analytical' ? 'x' : 'x₀'}) = {results.result.toFixed(6)}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Método:</h4>
                    <p className="text-sm text-muted-foreground">{results.method}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Fórmula utilizada:</h4>
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {results.formula}
                    </code>
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
