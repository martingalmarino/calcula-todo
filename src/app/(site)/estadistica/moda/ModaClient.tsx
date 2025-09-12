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
import { Calculator, BarChart3, Trash2, Target, TrendingUp } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface ModaResult {
  numeros: number[]
  frecuencias: Record<number, number>
  moda: number[]
  frecuenciaMaxima: number
  esUnimodal: boolean
  esBimodal: boolean
  esMultimodal: boolean
  explicacion: string
}

export default function ModaClient() {
  const [numeros, setNumeros] = useState<string>('')
  const [resultado, setResultado] = useState<ModaResult | null>(null)
  const [error, setError] = useState<string>('')

  const calcularModa = () => {
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

      // Calcular frecuencias
      const frecuencias: Record<number, number> = {}
      numerosArray.forEach(num => {
        frecuencias[num] = (frecuencias[num] || 0) + 1
      })

      // Encontrar la frecuencia máxima
      const frecuenciaMaxima = Math.max(...Object.values(frecuencias))
      
      // Encontrar todos los valores con frecuencia máxima
      const moda = Object.entries(frecuencias)
        .filter(([_, freq]) => freq === frecuenciaMaxima)
        .map(([num, _]) => parseFloat(num))
        .sort((a, b) => a - b)

      const esUnimodal = moda.length === 1
      const esBimodal = moda.length === 2
      const esMultimodal = moda.length > 2

      let explicacion = ''
      if (esUnimodal) {
        explicacion = `La moda es ${moda[0]} porque aparece ${frecuenciaMaxima} vez${frecuenciaMaxima > 1 ? 'es' : ''}, más que cualquier otro valor.`
      } else if (esBimodal) {
        explicacion = `Los datos son bimodales. Las modas son ${moda.join(' y ')} porque ambos aparecen ${frecuenciaMaxima} veces.`
      } else if (esMultimodal) {
        explicacion = `Los datos son multimodales. Las modas son ${moda.join(', ')} porque todos aparecen ${frecuenciaMaxima} veces.`
      }

      setResultado({
        numeros: numerosArray,
        frecuencias,
        moda,
        frecuenciaMaxima,
        esUnimodal,
        esBimodal,
        esMultimodal,
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
      label: 'Notas: 85, 92, 85, 78, 85 (unimodal)',
      values: { numeros: '85, 92, 85, 78, 85' }
    },
    {
      label: 'Ventas: 100 150 100 200 150 (bimodal)',
      values: { numeros: '100 150 100 200 150' }
    },
    {
      label: 'Edades: 25, 30, 25, 35, 30, 25, 40',
      values: { numeros: '25, 30, 25, 35, 30, 25, 40' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la moda?',
      answer: 'La moda es el valor que aparece con mayor frecuencia en un conjunto de datos. Puede haber una moda (unimodal), dos modas (bimodal) o múltiples modas (multimodal).'
    },
    {
      question: '¿Cuándo usar la moda?',
      answer: 'La moda es especialmente útil para datos categóricos y cuando quieres identificar el valor más común o popular en un conjunto de datos.'
    },
    {
      question: '¿Puede haber más de una moda?',
      answer: 'Sí, si varios valores tienen la misma frecuencia máxima, todos son modas. Esto se llama bimodal (2 modas) o multimodal (más de 2 modas).'
    },
    {
      question: '¿Qué pasa si todos los valores aparecen la misma cantidad de veces?',
      answer: 'En ese caso, todos los valores son modas, o se dice que no hay moda si todos aparecen solo una vez.'
    }
  ]

  const disclaimer = 'La moda es especialmente útil para datos categóricos y encuestas donde interesa identificar el valor más frecuente.'

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica/' },
          { label: 'Moda', href: '/estadistica/moda/' }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Moda',
            description: 'Identifica la moda (valor que más se repite) en un conjunto de datos',
            url: '/estadistica/moda/',
            category: 'Estadística'
          }))
        }}
      />
      
      <div className="py-8">
        <CalculatorLayout
          title="Calculadora de Moda"
          description="Identifica el valor que más se repite en un conjunto de datos. Útil para análisis de encuestas y frecuencias"
          examples={examples}
          faqItems={faqItems}
          onExampleClick={handleExampleClick}
          disclaimer={disclaimer}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Calculadora de Moda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numeros">Lista de números</Label>
                <Input
                  id="numeros"
                  type="text"
                  placeholder="Ej: 85, 92, 85, 78, 85"
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
                  onClick={calcularModa}
                  className="flex-1"
                  style={{ backgroundColor: '#0284c7' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Moda
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
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-800 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Resultado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {resultado.moda.join(', ')}
                        </div>
                        <div className="text-sm text-gray-600">Moda{resultado.moda.length > 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {resultado.frecuenciaMaxima}
                        </div>
                        <div className="text-sm text-gray-600">Frecuencia Máxima</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {resultado.esUnimodal ? 'Unimodal' : resultado.esBimodal ? 'Bimodal' : 'Multimodal'}
                        </div>
                        <div className="text-sm text-gray-600">Tipo</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Frecuencias de cada valor:
                      </h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {Object.entries(resultado.frecuencias)
                            .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                            .map(([valor, frecuencia]) => (
                            <div 
                              key={valor}
                              className={`p-2 rounded text-center ${
                                resultado.moda.includes(parseFloat(valor))
                                  ? 'bg-purple-200 text-purple-800 font-bold'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <div className="font-semibold">{valor}</div>
                              <div className="text-sm">{frecuencia} vez{frecuencia > 1 ? 'es' : ''}</div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Los valores en morado son las modas (frecuencia máxima)
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
                      <h4 className="font-semibold text-gray-800">Datos ingresados:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex flex-wrap gap-2">
                          {resultado.numeros.map((num, index) => (
                            <span 
                              key={index}
                              className={`px-2 py-1 rounded text-sm ${
                                resultado.moda.includes(num)
                                  ? 'bg-purple-200 text-purple-800 font-bold'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Los números en morado son las modas
                        </p>
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
