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
import { Calculator, BarChart3, Plus, Trash2 } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface MediaResult {
  numeros: number[]
  suma: number
  cantidad: number
  media: number
  formula: string
}

export default function MediaAritmeticaClient() {
  const [numeros, setNumeros] = useState<string>('')
  const [resultado, setResultado] = useState<MediaResult | null>(null)
  const [error, setError] = useState<string>('')

  const calcularMedia = () => {
    setError('')
    
    if (!numeros.trim()) {
      setError('Por favor, ingresa al menos un número')
      return
    }

    try {
      // Parsear números separados por comas, espacios o saltos de línea
      const numerosArray = numeros
        .split(/[,\s\n]+/)
        .map(n => n.trim())
        .filter(n => n !== '')
        .map(n => parseFloat(n))

      if (numerosArray.length === 0) {
        setError('No se encontraron números válidos')
        return
      }

      if (numerosArray.some(n => isNaN(n))) {
        setError('Todos los valores deben ser números válidos')
        return
      }

      const suma = numerosArray.reduce((acc, num) => acc + num, 0)
      const cantidad = numerosArray.length
      const media = suma / cantidad

      const formula = `Media = (${numerosArray.join(' + ')}) / ${cantidad} = ${suma} / ${cantidad} = ${media.toFixed(4)}`

      setResultado({
        numeros: numerosArray,
        suma,
        cantidad,
        media,
        formula
      })
    } catch (err) {
      setError('Error al procesar los números')
    }
  }

  const limpiar = () => {
    setNumeros('')
    setResultado(null)
    setError('')
  }

  const handleExampleClick = (values: { numeros?: string }) => {
    if (values.numeros) {
      setNumeros(values.numeros)
    }
  }

  const examples = [
    {
      label: 'Notas de un estudiante: 85, 92, 78, 96, 88',
      values: { numeros: '85, 92, 78, 96, 88' }
    },
    {
      label: 'Ventas mensuales: 1200 1500 980 1350 1100',
      values: { numeros: '1200 1500 980 1350 1100' }
    },
    {
      label: 'Temperaturas: 22.5, 24.1, 23.8, 25.2, 21.9',
      values: { numeros: '22.5, 24.1, 23.8, 25.2, 21.9' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la media aritmética?',
      answer: 'La media aritmética es el promedio de un conjunto de números, calculado sumando todos los valores y dividiendo entre la cantidad de elementos.'
    },
    {
      question: '¿Cómo se calcula la media aritmética?',
      answer: 'Se suma todos los números y se divide entre la cantidad de números: Media = (x₁ + x₂ + ... + xₙ) / n'
    },
    {
      question: '¿Cuándo usar la media aritmética?',
      answer: 'Es útil para encontrar el valor típico de un conjunto de datos, especialmente cuando los valores están distribuidos de manera relativamente uniforme.'
    },
    {
      question: '¿Qué pasa si hay valores muy extremos?',
      answer: 'La media aritmética es sensible a valores extremos (outliers). En esos casos, la mediana puede ser una mejor medida de tendencia central.'
    }
  ]

  const disclaimer = 'Esta calculadora proporciona la media aritmética básica. Para análisis estadísticos avanzados, considera usar software especializado.'

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica/' },
          { label: 'Media Aritmética', href: '/estadistica/media-aritmetica/' }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Media Aritmética',
            description: 'Calcula la media aritmética (promedio) de una lista de números con fórmula aplicada',
            url: '/estadistica/media-aritmetica/',
            category: 'Estadística'
          }))
        }}
      />
      
      <div className="py-8">
        <CalculatorLayout
          title="Calculadora de Media Aritmética"
          description="Calcula la media aritmética (promedio) de una lista de números con fórmula aplicada paso a paso"
          examples={examples}
          faqItems={faqItems}
          onExampleClick={handleExampleClick}
          disclaimer={disclaimer}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Calculadora de Media Aritmética
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numeros">Lista de números</Label>
                <Input
                  id="numeros"
                  type="text"
                  placeholder="Ej: 85, 92, 78, 96, 88 o 85 92 78 96 88"
                  value={numeros}
                  onChange={(e) => setNumeros(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">
                  Separa los números con comas, espacios o saltos de línea
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={calcularMedia}
                  className="flex-1"
                  style={{ backgroundColor: '#0284c7' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Media
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
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Resultado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {resultado.media.toFixed(4)}
                        </div>
                        <div className="text-sm text-gray-600">Media Aritmética</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {resultado.suma}
                        </div>
                        <div className="text-sm text-gray-600">Suma Total</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {resultado.cantidad}
                        </div>
                        <div className="text-sm text-gray-600">Cantidad</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Fórmula aplicada:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <code className="text-sm">{resultado.formula}</code>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Números ingresados:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex flex-wrap gap-2">
                          {resultado.numeros.map((num, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                            >
                              {num}
                            </span>
                          ))}
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
