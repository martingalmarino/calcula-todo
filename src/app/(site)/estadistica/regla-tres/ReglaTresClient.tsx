"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { Calculator, PieChart, Trash2, ArrowRight, Users } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface ReglaTresResult {
  a: number
  b: number
  c: number
  x: number
  formula: string
  explicacion: string
  tipo: 'directa' | 'inversa'
}

export default function ReglaTresClient() {
  const [a, setA] = useState<string>('')
  const [b, setB] = useState<string>('')
  const [c, setC] = useState<string>('')
  const [resultado, setResultado] = useState<ReglaTresResult | null>(null)
  const [error, setError] = useState<string>('')

  const calcularReglaTres = () => {
    setError('')
    
    if (!a.trim() || !b.trim() || !c.trim()) {
      setError('Por favor, ingresa los tres valores')
      return
    }

    try {
      const valorA = parseFloat(a)
      const valorB = parseFloat(b)
      const valorC = parseFloat(c)

      if (isNaN(valorA) || isNaN(valorB) || isNaN(valorC)) {
        setError('Todos los valores deben ser números válidos')
        return
      }

      if (valorA === 0 || valorB === 0) {
        setError('Los valores A y B no pueden ser cero')
        return
      }

      // Regla de tres directa: A es a B como C es a X
      // X = (B * C) / A
      const x = (valorB * valorC) / valorA

      const formula = `X = (B × C) / A = (${valorB} × ${valorC}) / ${valorA} = ${(valorB * valorC).toFixed(2)} / ${valorA} = ${x.toFixed(4)}`

      const explicacion = `Si ${valorA} corresponde a ${valorB}, entonces ${valorC} corresponde a ${x.toFixed(4)}`

      setResultado({
        a: valorA,
        b: valorB,
        c: valorC,
        x,
        formula,
        explicacion,
        tipo: 'directa'
      })
    } catch (err) {
      setError('Error al procesar los valores')
    }
  }

  const limpiar = () => {
    setA('')
    setB('')
    setC('')
    setResultado(null)
    setError('')
  }

  const handleExampleClick = (values: { a?: string; b?: string; c?: string }) => {
    if (values.a) setA(values.a)
    if (values.b) setB(values.b)
    if (values.c) setC(values.c)
  }

  const examples = [
    {
      label: 'Si 20 personas = 5 mesas, ¿100 personas = ? mesas',
      values: { a: '20', b: '5', c: '100' }
    },
    {
      label: 'Si 3 horas = 150 km, ¿5 horas = ? km',
      values: { a: '3', b: '150', c: '5' }
    },
    {
      label: 'Si 2 kg = $8, ¿7 kg = ? pesos',
      values: { a: '2', b: '8', c: '7' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la regla de tres?',
      answer: 'La regla de tres es un método para resolver problemas de proporcionalidad directa entre dos magnitudes conocidas y una desconocida.'
    },
    {
      question: '¿Cómo funciona la regla de tres?',
      answer: 'Si A es a B como C es a X, entonces X = (B × C) / A. Es útil para extrapolar datos y hacer estimaciones.'
    },
    {
      question: '¿Cuándo usar la regla de tres?',
      answer: 'Es muy útil en análisis de encuestas, cálculos de costos, estimaciones de tiempo, y cualquier situación con proporcionalidad directa.'
    },
    {
      question: '¿Qué es proporcionalidad directa?',
      answer: 'Significa que cuando una magnitud aumenta, la otra también aumenta proporcionalmente. Por ejemplo: más personas = más mesas necesarias.'
    }
  ]

  const disclaimer = 'Esta calculadora asume proporcionalidad directa. Para relaciones inversas o complejas, se requieren métodos más avanzados.'

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica/' },
          { label: 'Regla de Tres', href: '/estadistica/regla-tres/' }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Regla de Tres',
            description: 'Calcula proporciones usando la regla de tres para análisis estadístico',
            url: '/estadistica/regla-tres/',
            category: 'Estadística'
          }))
        }}
      />
      
      <div className="py-8">
        <CalculatorLayout
          title="Calculadora de Regla de Tres (Proporciones)"
          description="Calcula proporciones usando la regla de tres. Útil para análisis de encuestas, extrapolación de datos y cálculos proporcionales"
          examples={examples}
          faqItems={faqItems}
          onExampleClick={handleExampleClick}
          disclaimer={disclaimer}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Calculadora de Regla de Tres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Si <strong>A</strong> es a <strong>B</strong> como <strong>C</strong> es a <strong>X</strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Ingresa los valores A, B y C para calcular X
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="a">Valor A</Label>
                    <Input
                      id="a"
                      type="number"
                      placeholder="Ej: 20"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      step="any"
                    />
                    <p className="text-sm text-gray-600">
                      Primera magnitud conocida
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="b">Valor B</Label>
                    <Input
                      id="b"
                      type="number"
                      placeholder="Ej: 5"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      step="any"
                    />
                    <p className="text-sm text-gray-600">
                      Segunda magnitud conocida
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c">Valor C</Label>
                    <Input
                      id="c"
                      type="number"
                      placeholder="Ej: 100"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      step="any"
                    />
                    <p className="text-sm text-gray-600">
                      Tercera magnitud conocida
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={calcularReglaTres}
                  className="flex-1"
                  style={{ backgroundColor: '#0284c7', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular X
                </Button>
                <Button 
                  onClick={limpiar}
                  variant="outline"
                  className="sm:w-auto w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar
                </Button>
              </div>

              {resultado && (
                <Card className="bg-teal-50 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-800 flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Resultado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-3xl font-bold text-teal-600 mb-2">
                        X = {resultado.x.toFixed(4)}
                      </div>
                      <div className="text-sm text-gray-600">Valor calculado</div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Fórmula aplicada:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <code className="text-sm">{resultado.formula}</code>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Explicación:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm">{resultado.explicacion}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Proporción:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex items-center justify-center gap-4 text-lg">
                          <div className="text-center">
                            <div className="font-bold text-blue-600">{resultado.a}</div>
                            <div className="text-xs text-gray-600">A</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="text-center">
                            <div className="font-bold text-green-600">{resultado.b}</div>
                            <div className="text-xs text-gray-600">B</div>
                          </div>
                          <div className="text-gray-400">::</div>
                          <div className="text-center">
                            <div className="font-bold text-purple-600">{resultado.c}</div>
                            <div className="text-xs text-gray-600">C</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="text-center">
                            <div className="font-bold text-teal-600">{resultado.x.toFixed(2)}</div>
                            <div className="text-xs text-gray-600">X</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Datos ingresados:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">{resultado.a}</div>
                            <div className="text-sm text-gray-600">Valor A</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{resultado.b}</div>
                            <div className="text-sm text-gray-600">Valor B</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">{resultado.c}</div>
                            <div className="text-sm text-gray-600">Valor C</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </CalculatorLayout>
      </div>
    </Container>
  )
}
