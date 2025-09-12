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
import { Calculator, Target, Trash2, Percent, Hash } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface ProbabilidadResult {
  casosFavorables: number
  casosTotales: number
  probabilidad: number
  fraccion: string
  decimal: number
  porcentaje: number
  formula: string
  interpretacion: string
}

// Función para simplificar fracciones
const simplificarFraccion = (numerador: number, denominador: number): string => {
  const mcd = (a: number, b: number): number => b === 0 ? a : mcd(b, a % b)
  const divisor = mcd(numerador, denominador)
  const numSimplificado = numerador / divisor
  const denSimplificado = denominador / divisor
  
  if (denSimplificado === 1) {
    return numSimplificado.toString()
  }
  
  return `${numSimplificado}/${denSimplificado}`
}

export default function ProbabilidadSimpleClient() {
  const [casosFavorables, setCasosFavorables] = useState<string>('')
  const [casosTotales, setCasosTotales] = useState<string>('')
  const [resultado, setResultado] = useState<ProbabilidadResult | null>(null)
  const [error, setError] = useState<string>('')

  const calcularProbabilidad = () => {
    setError('')
    
    if (!casosFavorables.trim() || !casosTotales.trim()) {
      setError('Por favor, ingresa ambos valores')
      return
    }

    try {
      const favorables = parseInt(casosFavorables)
      const totales = parseInt(casosTotales)

      if (isNaN(favorables) || isNaN(totales)) {
        setError('Ambos valores deben ser números enteros')
        return
      }

      if (favorables < 0 || totales <= 0) {
        setError('Los casos favorables deben ser ≥ 0 y los casos totales deben ser > 0')
        return
      }

      if (favorables > totales) {
        setError('Los casos favorables no pueden ser mayores que los casos totales')
        return
      }

      const probabilidad = favorables / totales
      const fraccion = simplificarFraccion(favorables, totales)
      const decimal = probabilidad
      const porcentaje = probabilidad * 100

      const formula = `P = Casos Favorables / Casos Totales = ${favorables} / ${totales} = ${fraccion} = ${decimal.toFixed(4)} = ${porcentaje.toFixed(2)}%`

      let interpretacion = ''
      if (porcentaje === 0) {
        interpretacion = 'Evento imposible (0% de probabilidad)'
      } else if (porcentaje === 100) {
        interpretacion = 'Evento seguro (100% de probabilidad)'
      } else if (porcentaje < 25) {
        interpretacion = 'Probabilidad muy baja'
      } else if (porcentaje < 50) {
        interpretacion = 'Probabilidad baja'
      } else if (porcentaje === 50) {
        interpretacion = 'Probabilidad media (50-50)'
      } else if (porcentaje < 75) {
        interpretacion = 'Probabilidad alta'
      } else {
        interpretacion = 'Probabilidad muy alta'
      }

      setResultado({
        casosFavorables: favorables,
        casosTotales: totales,
        probabilidad,
        fraccion,
        decimal,
        porcentaje,
        formula,
        interpretacion
      })
    } catch (err) {
      setError('Error al procesar los valores')
    }
  }

  const limpiar = () => {
    setCasosFavorables('')
    setCasosTotales('')
    setResultado(null)
    setError('')
  }

  const handleExampleClick = (values: { casosFavorables?: string; casosTotales?: string }) => {
    if (values.casosFavorables) {
      setCasosFavorables(values.casosFavorables)
    }
    if (values.casosTotales) {
      setCasosTotales(values.casosTotales)
    }
  }

  const examples = [
    {
      label: 'Lanzar un dado y obtener 6: 1 caso favorable de 6 totales',
      values: { casosFavorables: '1', casosTotales: '6' }
    },
    {
      label: 'Sacar una carta roja de una baraja: 26 casos favorables de 52 totales',
      values: { casosFavorables: '26', casosTotales: '52' }
    },
    {
      label: 'Ganar en una rifa: 3 boletos ganadores de 100 vendidos',
      values: { casosFavorables: '3', casosTotales: '100' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la probabilidad simple?',
      answer: 'La probabilidad simple es la medida de qué tan probable es que ocurra un evento, calculada como casos favorables dividido entre casos totales.'
    },
    {
      question: '¿Cómo se calcula la probabilidad?',
      answer: 'P = Casos Favorables / Casos Totales. El resultado puede expresarse como fracción, decimal (0-1) o porcentaje (0-100%).'
    },
    {
      question: '¿Qué significa probabilidad 0 y 1?',
      answer: 'Probabilidad 0 significa evento imposible, probabilidad 1 (o 100%) significa evento seguro.'
    },
    {
      question: '¿Cuándo usar probabilidad simple?',
      answer: 'Es útil para eventos con resultados igualmente probables, como lanzar dados, sacar cartas, o cualquier situación con casos favorables y totales claros.'
    }
  ]

  const disclaimer = 'Esta calculadora asume que todos los casos son igualmente probables. Para eventos dependientes o complejos, se requieren métodos más avanzados.'

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica/' },
          { label: 'Probabilidad Simple', href: '/estadistica/probabilidad-simple/' }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Probabilidad Simple',
            description: 'Calcula probabilidad simple dividiendo casos favorables entre casos totales',
            url: '/estadistica/probabilidad-simple/',
            category: 'Estadística'
          }))
        }}
      />
      
      <div className="py-8">
        <CalculatorLayout
          title="Calculadora de Probabilidad Simple"
          description="Calcula probabilidad simple dividiendo casos favorables entre casos totales. Resultado en fracción, decimal y porcentaje"
          examples={examples}
          faqItems={faqItems}
          onExampleClick={handleExampleClick}
          disclaimer={disclaimer}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Calculadora de Probabilidad Simple
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="casosFavorables">Casos favorables</Label>
                  <Input
                    id="casosFavorables"
                    type="number"
                    placeholder="Ej: 1"
                    value={casosFavorables}
                    onChange={(e) => setCasosFavorables(e.target.value)}
                    min="0"
                  />
                  <p className="text-sm text-gray-600">
                    Número de casos que favorecen el evento
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="casosTotales">Casos totales</Label>
                  <Input
                    id="casosTotales"
                    type="number"
                    placeholder="Ej: 6"
                    value={casosTotales}
                    onChange={(e) => setCasosTotales(e.target.value)}
                    min="1"
                  />
                  <p className="text-sm text-gray-600">
                    Número total de casos posibles
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={calcularProbabilidad}
                  className="flex-1"
                  style={{ backgroundColor: '#0284c7', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Probabilidad
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
                <Card className="bg-indigo-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-800 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Resultado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 flex items-center justify-center gap-2">
                          <Hash className="h-5 w-5" />
                          {resultado.fraccion}
                        </div>
                        <div className="text-sm text-gray-600">Fracción</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {resultado.decimal.toFixed(4)}
                        </div>
                        <div className="text-sm text-gray-600">Decimal</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
                          <Percent className="h-5 w-5" />
                          {resultado.porcentaje.toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600">Porcentaje</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Fórmula aplicada:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <code className="text-sm">{resultado.formula}</code>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Interpretación:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm font-medium text-gray-800">{resultado.interpretacion}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {resultado.casosFavorables} de {resultado.casosTotales} casos posibles
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Datos ingresados:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">{resultado.casosFavorables}</div>
                            <div className="text-sm text-gray-600">Casos Favorables</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{resultado.casosTotales}</div>
                            <div className="text-sm text-gray-600">Casos Totales</div>
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
