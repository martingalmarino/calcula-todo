"use client"

import { useState } from 'react'
import { Calculator, X, Square } from 'lucide-react'
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
  solveLinear,
  solveQuadratic,
  solveSystem2x2,
  factorQuadratic,
  vertexOfParabola
} from '@/lib/math/algebra'

export default function AlgebraPage() {
  const [activeTab, setActiveTab] = useState('linear')
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [linearValues, setLinearValues] = useState({ a: '', b: '' })
  const [quadraticValues, setQuadraticValues] = useState({ a: '', b: '', c: '' })
  const [systemValues, setSystemValues] = useState({ a: '', b: '', c: '', d: '', e: '', f: '' })
  const [factorValues, setFactorValues] = useState({ a: '', b: '', c: '' })
  const [vertexValues, setVertexValues] = useState({ a: '', b: '', c: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'linear':
          if (!linearValues.a || !linearValues.b) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = solveLinear(Number(linearValues.a), Number(linearValues.b))
          break
        case 'quadratic':
          if (!quadraticValues.a || !quadraticValues.b || !quadraticValues.c) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = solveQuadratic(Number(quadraticValues.a), Number(quadraticValues.b), Number(quadraticValues.c))
          break
        case 'system':
          if (!systemValues.a || !systemValues.b || !systemValues.c || !systemValues.d || !systemValues.e || !systemValues.f) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = solveSystem2x2(
            Number(systemValues.a), Number(systemValues.b), Number(systemValues.c),
            Number(systemValues.d), Number(systemValues.e), Number(systemValues.f)
          )
          break
        case 'factor':
          if (!factorValues.a || !factorValues.b || !factorValues.c) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = factorQuadratic(Number(factorValues.a), Number(factorValues.b), Number(factorValues.c))
          break
        case 'vertex':
          if (!vertexValues.a || !vertexValues.b || !vertexValues.c) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = vertexOfParabola(Number(vertexValues.a), Number(vertexValues.b), Number(vertexValues.c))
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
      case 'linear':
        setLinearValues({ a: (values.a as number).toString(), b: (values.b as number).toString() })
        break
      case 'quadratic':
        setQuadraticValues({ a: (values.a as number).toString(), b: (values.b as number).toString(), c: (values.c as number).toString() })
        break
      case 'system':
        setSystemValues({ 
          a: (values.a as number).toString(), b: (values.b as number).toString(), c: (values.c as number).toString(),
          d: (values.d as number).toString(), e: (values.e as number).toString(), f: (values.f as number).toString()
        })
        break
      case 'factor':
        setFactorValues({ a: (values.a as number).toString(), b: (values.b as number).toString(), c: (values.c as number).toString() })
        break
      case 'vertex':
        setVertexValues({ a: (values.a as number).toString(), b: (values.b as number).toString(), c: (values.c as number).toString() })
        break
    }
  }

  const examples = [
    { label: '2x + 3 = 0', values: { a: 2, b: 3 } },
    { label: 'x² - 5x + 6 = 0', values: { a: 1, b: -5, c: 6 } },
    { label: 'Sistema 2x2', values: { a: 2, b: 3, c: 1, d: -1, e: 7, f: 1 } },
    { label: 'Factorizar x² + 2x + 1', values: { a: 1, b: 2, c: 1 } },
    { label: 'Vértice y = x² - 4x + 3', values: { a: 1, b: -4, c: 3 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una ecuación lineal?",
      answer: "Una ecuación lineal es una ecuación de primer grado que se puede escribir en la forma ax + b = 0, donde a y b son números reales y a ≠ 0."
    },
    {
      question: "¿Qué es una ecuación cuadrática?",
      answer: "Una ecuación cuadrática es una ecuación de segundo grado que se puede escribir en la forma ax² + bx + c = 0, donde a, b y c son números reales y a ≠ 0."
    },
    {
      question: "¿Qué es el discriminante?",
      answer: "El discriminante (Δ = b² - 4ac) determina la naturaleza de las raíces de una ecuación cuadrática: si Δ > 0 hay dos raíces reales distintas, si Δ = 0 hay una raíz doble, y si Δ < 0 hay raíces complejas."
    },
    {
      question: "¿Cómo se resuelve un sistema de ecuaciones?",
      answer: "Un sistema de ecuaciones lineales 2x2 se puede resolver usando métodos como sustitución, eliminación o determinantes. El método de determinantes es eficiente para sistemas pequeños."
    },
    {
      question: "¿Qué es el vértice de una parábola?",
      answer: "El vértice de una parábola es el punto donde la curva cambia de dirección. Para y = ax² + bx + c, el vértice está en x = -b/(2a)."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'algebra').map(calc => ({
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
            name: 'Calculadora de Álgebra',
            description: 'Resuelve ecuaciones lineales, cuadráticas, sistemas de ecuaciones y más operaciones algebraicas',
            url: '/matematicas/algebra/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/algebra/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Álgebra"
            description="Resuelve ecuaciones lineales, cuadráticas, sistemas de ecuaciones y más operaciones algebraicas"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="linear" className="calculator-tab">Lineal</TabsTrigger>
                <TabsTrigger value="quadratic" className="calculator-tab">Cuadrática</TabsTrigger>
                <TabsTrigger value="system" className="calculator-tab">Sistema 2x2</TabsTrigger>
                <TabsTrigger value="factor" className="calculator-tab">Factorizar</TabsTrigger>
                <TabsTrigger value="vertex" className="calculator-tab">Vértice</TabsTrigger>
              </TabsList>

              <TabsContent value="linear" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="linear-a" className="calculator-label">
                        Coeficiente a
                      </label>
                      <Input
                        id="linear-a"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={linearValues.a}
                        onChange={(e) => setLinearValues({ ...linearValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="linear-b" className="calculator-label">
                        Coeficiente b
                      </label>
                      <Input
                        id="linear-b"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={linearValues.b}
                        onChange={(e) => setLinearValues({ ...linearValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <X className="h-4 w-4 mr-2" />
                    Resolver Ecuación Lineal
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="quadratic" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="quad-a" className="calculator-label">
                        Coeficiente a
                      </label>
                      <Input
                        id="quad-a"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={quadraticValues.a}
                        onChange={(e) => setQuadraticValues({ ...quadraticValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="quad-b" className="calculator-label">
                        Coeficiente b
                      </label>
                      <Input
                        id="quad-b"
                        type="number"
                        step="0.001"
                        placeholder="Ej: -5"
                        value={quadraticValues.b}
                        onChange={(e) => setQuadraticValues({ ...quadraticValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="quad-c" className="calculator-label">
                        Coeficiente c
                      </label>
                      <Input
                        id="quad-c"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 6"
                        value={quadraticValues.c}
                        onChange={(e) => setQuadraticValues({ ...quadraticValues, c: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Square className="h-4 w-4 mr-2" />
                    Resolver Ecuación Cuadrática
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="sys-a" className="calculator-label">
                        a (primera ecuación)
                      </label>
                      <Input
                        id="sys-a"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={systemValues.a}
                        onChange={(e) => setSystemValues({ ...systemValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sys-b" className="calculator-label">
                        b (primera ecuación)
                      </label>
                      <Input
                        id="sys-b"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={systemValues.b}
                        onChange={(e) => setSystemValues({ ...systemValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sys-c" className="calculator-label">
                        c (segunda ecuación)
                      </label>
                      <Input
                        id="sys-c"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={systemValues.c}
                        onChange={(e) => setSystemValues({ ...systemValues, c: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sys-d" className="calculator-label">
                        d (segunda ecuación)
                      </label>
                      <Input
                        id="sys-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: -1"
                        value={systemValues.d}
                        onChange={(e) => setSystemValues({ ...systemValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sys-e" className="calculator-label">
                        e (resultado primera)
                      </label>
                      <Input
                        id="sys-e"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 7"
                        value={systemValues.e}
                        onChange={(e) => setSystemValues({ ...systemValues, e: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sys-f" className="calculator-label">
                        f (resultado segunda)
                      </label>
                      <Input
                        id="sys-f"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={systemValues.f}
                        onChange={(e) => setSystemValues({ ...systemValues, f: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Resolver Sistema 2x2
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="factor" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="fact-a" className="calculator-label">
                        Coeficiente a
                      </label>
                      <Input
                        id="fact-a"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={factorValues.a}
                        onChange={(e) => setFactorValues({ ...factorValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="fact-b" className="calculator-label">
                        Coeficiente b
                      </label>
                      <Input
                        id="fact-b"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={factorValues.b}
                        onChange={(e) => setFactorValues({ ...factorValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="fact-c" className="calculator-label">
                        Coeficiente c
                      </label>
                      <Input
                        id="fact-c"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={factorValues.c}
                        onChange={(e) => setFactorValues({ ...factorValues, c: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Factorizar Cuadrática
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="vertex" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="vert-a" className="calculator-label">
                        Coeficiente a
                      </label>
                      <Input
                        id="vert-a"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={vertexValues.a}
                        onChange={(e) => setVertexValues({ ...vertexValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="vert-b" className="calculator-label">
                        Coeficiente b
                      </label>
                      <Input
                        id="vert-b"
                        type="number"
                        step="0.001"
                        placeholder="Ej: -4"
                        value={vertexValues.b}
                        onChange={(e) => setVertexValues({ ...vertexValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="vert-c" className="calculator-label">
                        Coeficiente c
                      </label>
                      <Input
                        id="vert-c"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={vertexValues.c}
                        onChange={(e) => setVertexValues({ ...vertexValues, c: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Vértice
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
                  {activeTab === 'linear' && (
                    <div className="text-2xl font-bold text-primary">
                      x = {results.x.toFixed(6)}
                    </div>
                  )}
                  
                  {activeTab === 'quadratic' && (
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">
                        Discriminante: {results.discriminant}
                      </div>
                      <div className="text-lg font-semibold">
                        Naturaleza: {results.nature === 'real-distinct' ? 'Dos raíces reales distintas' : 
                                   results.nature === 'real-equal' ? 'Una raíz real doble' : 'Raíces complejas'}
                      </div>
                      {results.x1 !== null && (
                        <div className="text-2xl font-bold text-primary">
                          x₁ = {results.x1.toFixed(6)}
                        </div>
                      )}
                      {results.x2 !== null && results.x2 !== results.x1 && (
                        <div className="text-2xl font-bold text-primary">
                          x₂ = {results.x2.toFixed(6)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'system' && (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        x = {results.x.toFixed(6)}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        y = {results.y.toFixed(6)}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'factor' && (
                    <div className="text-2xl font-bold text-primary">
                      {results.factors}
                    </div>
                  )}
                  
                  {activeTab === 'vertex' && (
                    <div className="text-2xl font-bold text-primary">
                      Vértice: ({results.x.toFixed(6)}, {results.y.toFixed(6)})
                    </div>
                  )}
                  
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
