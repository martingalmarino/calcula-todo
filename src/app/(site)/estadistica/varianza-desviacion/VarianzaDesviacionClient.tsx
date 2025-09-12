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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, TrendingUp, Trash2, BarChart3 } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface VarianzaResult {
  numeros: number[]
  media: number
  tipo: 'poblacion' | 'muestra'
  n: number
  varianza: number
  desviacionEstandar: number
  diferencias: number[]
  diferenciasCuadradas: number[]
  sumaDiferenciasCuadradas: number
  formulaVarianza: string
  formulaDesviacion: string
}

export default function VarianzaDesviacionClient() {
  const [numeros, setNumeros] = useState<string>('')
  const [tipo, setTipo] = useState<'poblacion' | 'muestra'>('poblacion')
  const [resultado, setResultado] = useState<VarianzaResult | null>(null)
  const [error, setError] = useState<string>('')

  const calcularVarianza = () => {
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

      if (tipo === 'muestra' && numerosArray.length < 2) {
        setError('Para calcular la varianza de muestra necesitas al menos 2 números')
        return
      }

      // Calcular media
      const media = numerosArray.reduce((acc, num) => acc + num, 0) / numerosArray.length

      // Calcular diferencias respecto a la media
      const diferencias = numerosArray.map(num => num - media)
      const diferenciasCuadradas = diferencias.map(diff => diff * diff)
      const sumaDiferenciasCuadradas = diferenciasCuadradas.reduce((acc, diff) => acc + diff, 0)

      // Calcular varianza
      const n = tipo === 'poblacion' ? numerosArray.length : numerosArray.length - 1
      const varianza = sumaDiferenciasCuadradas / n
      const desviacionEstandar = Math.sqrt(varianza)

      // Generar fórmulas
      const formulaVarianza = tipo === 'poblacion' 
        ? `σ² = Σ(x - μ)² / N = ${sumaDiferenciasCuadradas.toFixed(4)} / ${numerosArray.length} = ${varianza.toFixed(4)}`
        : `s² = Σ(x - x̄)² / (n-1) = ${sumaDiferenciasCuadradas.toFixed(4)} / ${numerosArray.length - 1} = ${varianza.toFixed(4)}`

      const formulaDesviacion = tipo === 'poblacion'
        ? `σ = √σ² = √${varianza.toFixed(4)} = ${desviacionEstandar.toFixed(4)}`
        : `s = √s² = √${varianza.toFixed(4)} = ${desviacionEstandar.toFixed(4)}`

      setResultado({
        numeros: numerosArray,
        media,
        tipo,
        n,
        varianza,
        desviacionEstandar,
        diferencias,
        diferenciasCuadradas,
        sumaDiferenciasCuadradas,
        formulaVarianza,
        formulaDesviacion
      })
    } catch (err) {
      setError('Error al procesar los números')
    }
  }

  const limpiar = () => {
    setNumeros('')
    setTipo('poblacion')
    setResultado(null)
    setError('')
  }

  const handleExampleClick = (values: { numeros?: string; tipo?: 'poblacion' | 'muestra' }) => {
    if (values.numeros) {
      setNumeros(values.numeros)
    }
    if (values.tipo) {
      setTipo(values.tipo)
    }
  }

  const examples = [
    {
      label: 'Población: 2, 4, 6, 8, 10',
      values: { numeros: '2, 4, 6, 8, 10', tipo: 'poblacion' as const }
    },
    {
      label: 'Muestra: 85, 92, 78, 96, 88',
      values: { numeros: '85, 92, 78, 96, 88', tipo: 'muestra' as const }
    },
    {
      label: 'Temperaturas: 22.5, 24.1, 23.8, 25.2, 21.9, 23.5',
      values: { numeros: '22.5, 24.1, 23.8, 25.2, 21.9, 23.5', tipo: 'poblacion' as const }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la varianza?',
      answer: 'La varianza mide qué tan dispersos están los datos respecto a la media. Una varianza alta indica que los datos están muy dispersos.'
    },
    {
      question: '¿Cuál es la diferencia entre población y muestra?',
      answer: 'Para población se divide entre N (número total de datos), para muestra se divide entre (n-1) para obtener una estimación no sesgada.'
    },
    {
      question: '¿Qué es la desviación estándar?',
      answer: 'La desviación estándar es la raíz cuadrada de la varianza y tiene las mismas unidades que los datos originales.'
    },
    {
      question: '¿Cuándo usar población vs muestra?',
      answer: 'Usa población cuando tienes todos los datos del grupo completo, y muestra cuando trabajas con una parte representativa de la población.'
    }
  ]

  const disclaimer = 'La varianza y desviación estándar son medidas de dispersión importantes en análisis estadístico.'

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica/' },
          { label: 'Varianza y Desviación Estándar', href: '/estadistica/varianza-desviacion/' }
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Varianza y Desviación Estándar',
            description: 'Calcula varianza y desviación estándar para población o muestra',
            url: '/estadistica/varianza-desviacion/',
            category: 'Estadística'
          }))
        }}
      />
      
      <div className="py-8">
        <CalculatorLayout
          title="Calculadora de Varianza y Desviación Estándar"
          description="Calcula varianza y desviación estándar para población o muestra. Mide la dispersión de los datos respecto a la media"
          examples={examples}
          faqItems={faqItems}
          onExampleClick={handleExampleClick}
          disclaimer={disclaimer}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Calculadora de Varianza y Desviación Estándar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numeros">Lista de números</Label>
                <Input
                  id="numeros"
                  type="text"
                  placeholder="Ej: 2, 4, 6, 8, 10"
                  value={numeros}
                  onChange={(e) => setNumeros(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">
                  Separa los números con comas, espacios o saltos de línea
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de cálculo</Label>
                <Select value={tipo} onValueChange={(value: 'poblacion' | 'muestra') => setTipo(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poblacion">Población (σ², σ)</SelectItem>
                    <SelectItem value="muestra">Muestra (s², s)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">
                  {tipo === 'poblacion' 
                    ? 'Usa cuando tienes todos los datos de la población completa'
                    : 'Usa cuando trabajas con una muestra representativa de la población'
                  }
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={calcularVarianza}
                  className="flex-1"
                  style={{ backgroundColor: '#0284c7' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Varianza
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
                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-800 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Resultado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {resultado.varianza.toFixed(4)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Varianza {resultado.tipo === 'poblacion' ? '(σ²)' : '(s²)'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {resultado.desviacionEstandar.toFixed(4)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Desv. Est. {resultado.tipo === 'poblacion' ? '(σ)' : '(s)'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {resultado.media.toFixed(4)}
                        </div>
                        <div className="text-sm text-gray-600">Media</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {resultado.n}
                        </div>
                        <div className="text-sm text-gray-600">Divisor (n)</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Fórmula de Varianza:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <code className="text-sm">{resultado.formulaVarianza}</code>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Fórmula de Desviación Estándar:</h4>
                      <div className="bg-white p-3 rounded-lg border">
                        <code className="text-sm">{resultado.formulaDesviacion}</code>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Cálculo paso a paso:</h4>
                      <div className="bg-white p-3 rounded-lg border space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-semibold mb-2">Datos (x):</div>
                            <div className="flex flex-wrap gap-1">
                              {resultado.numeros.map((num, index) => (
                                <span key={index} className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                                  {num}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold mb-2">Diferencias (x - μ):</div>
                            <div className="flex flex-wrap gap-1">
                              {resultado.diferencias.map((diff, index) => (
                                <span key={index} className="px-1 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                                  {diff.toFixed(2)}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold mb-2">Diferencias² (x - μ)²:</div>
                            <div className="flex flex-wrap gap-1">
                              {resultado.diferenciasCuadradas.map((diff, index) => (
                                <span key={index} className="px-1 py-0.5 bg-orange-100 text-orange-800 rounded text-xs">
                                  {diff.toFixed(2)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="text-sm">
                            <strong>Suma de diferencias cuadradas:</strong> {resultado.sumaDiferenciasCuadradas.toFixed(4)}
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
