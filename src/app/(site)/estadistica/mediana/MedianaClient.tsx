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
import { Calculator, BarChart3, Trash2, ArrowUpDown } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface MedianaResult {
  numerosOriginales: number[]
  numerosOrdenados: number[]
  cantidad: number
  mediana: number
  esPar: boolean
  posicion: number
  explicacion: string
}

export default function MedianaClient() {
  const [numeros, setNumeros] = useState<string>('')
  const [resultado, setResultado] = useState<MedianaResult | null>(null)
  const [error, setError] = useState<string>('')

  const calcularMediana = () => {
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

      const numerosOriginales = [...numerosArray]
      const numerosOrdenados = [...numerosArray].sort((a, b) => a - b)
      const cantidad = numerosOrdenados.length
      const esPar = cantidad % 2 === 0
      
      let mediana: number
      let posicion: number
      let explicacion: string

      if (esPar) {
        const pos1 = cantidad / 2 - 1
        const pos2 = cantidad / 2
        mediana = (numerosOrdenados[pos1] + numerosOrdenados[pos2]) / 2
        posicion = pos1 + 1 // Para mostrar posición humana (1-indexed)
        explicacion = `Como hay ${cantidad} números (par), la mediana es el promedio de los valores en las posiciones ${pos1 + 1} y ${pos2 + 1}: (${numerosOrdenados[pos1]} + ${numerosOrdenados[pos2]}) / 2 = ${mediana}`
      } else {
        posicion = Math.floor(cantidad / 2) + 1 // Para mostrar posición humana (1-indexed)
        mediana = numerosOrdenados[Math.floor(cantidad / 2)]
        explicacion = `Como hay ${cantidad} números (impar), la mediana es el valor en la posición ${posicion}: ${mediana}`
      }

      setResultado({
        numerosOriginales,
        numerosOrdenados,
        cantidad,
        mediana,
        esPar,
        posicion,
        explicacion
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
      label: 'Edades: 25, 30, 35, 40, 45 (impar)',
      values: { numeros: '25, 30, 35, 40, 45' }
    },
    {
      label: 'Precios: 100 150 200 250 (par)',
      values: { numeros: '100 150 200 250' }
    },
    {
      label: 'Notas: 85, 92, 78, 96, 88, 91',
      values: { numeros: '85, 92, 78, 96, 88, 91' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la mediana?',
      answer: 'La mediana es el valor central de un conjunto de datos ordenados. Es una medida de tendencia central que no se ve afectada por valores extremos.'
    },
    {
      question: '¿Cómo se calcula la mediana?',
      answer: 'Se ordenan los datos de menor a mayor. Si hay un número impar de datos, la mediana es el valor central. Si hay un número par, es el promedio de los dos valores centrales.'
    },
    {
      question: '¿Cuándo usar la mediana en lugar de la media?',
      answer: 'La mediana es mejor cuando hay valores extremos (outliers) que pueden distorsionar la media aritmética.'
    },
    {
      question: '¿La mediana siempre es un número entero?',
      answer: 'No, cuando hay un número par de datos, la mediana puede ser un decimal al promediar los dos valores centrales.'
    }
  ]

  const disclaimer = 'La mediana es una medida robusta de tendencia central que no se ve afectada por valores extremos.'

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica/' },
          { label: 'Mediana', href: '/estadistica/mediana/' }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Mediana',
            description: 'Calcula la mediana de un conjunto de valores ordenados',
            url: '/estadistica/mediana/',
            category: 'Estadística'
          }))
        }}
      />
      
      <div className="py-8">
        <CalculatorLayout
          title="Calculadora de Mediana"
          description="Encuentra el valor central de un conjunto de datos después de ordenarlos automáticamente"
          examples={examples}
          faqItems={faqItems}
          onExampleClick={handleExampleClick}
          disclaimer={disclaimer}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Calculadora de Mediana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numeros">Lista de números</Label>
                <Input
                  id="numeros"
                  type="text"
                  placeholder="Ej: 25, 30, 35, 40, 45"
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
                  onClick={calcularMediana}
                  className="flex-1"
                  style={{ backgroundColor: '#0284c7' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Mediana
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
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Resultado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {resultado.mediana}
                        </div>
                        <div className="text-sm text-gray-600">Mediana</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {resultado.cantidad}
                        </div>
                        <div className="text-sm text-gray-600">Cantidad</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {resultado.esPar ? 'Par' : 'Impar'}
                        </div>
                        <div className="text-sm text-gray-600">Tipo</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Datos ordenados:
                      </h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex flex-wrap gap-2">
                          {resultado.numerosOrdenados.map((num, index) => (
                            <span 
                              key={index}
                              className={`px-2 py-1 rounded text-sm ${
                                resultado.esPar 
                                  ? (index === resultado.cantidad / 2 - 1 || index === resultado.cantidad / 2)
                                    ? 'bg-green-200 text-green-800 font-bold'
                                    : 'bg-gray-100 text-gray-800'
                                  : index === Math.floor(resultado.cantidad / 2)
                                    ? 'bg-green-200 text-green-800 font-bold'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Los números en verde son los valores centrales utilizados para calcular la mediana
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Explicación:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm">{resultado.explicacion}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Datos originales:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex flex-wrap gap-2">
                          {resultado.numerosOriginales.map((num, index) => (
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
