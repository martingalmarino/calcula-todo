"use client"

import { useState, useCallback } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Zap, Battery, Activity } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface LeyOhmResult {
  calculado: {
    valor: number
    unidad: string
    variable: string
  }
  formula: string
  calculo: string
  equivalencias: {
    tension: number
    corriente: number
    resistencia: number
  }
}

export function LeyOhmClient() {
  const [tension, setTension] = useState('')
  const [corriente, setCorriente] = useState('')
  const [resistencia, setResistencia] = useState('')
  const [resultado, setResultado] = useState<LeyOhmResult | null>(null)
  const [error, setError] = useState('')

  const calcularLeyOhm = useCallback(() => {
    setError('')
    setResultado(null)

    const v = tension ? parseFloat(tension) : null
    const i = corriente ? parseFloat(corriente) : null
    const r = resistencia ? parseFloat(resistencia) : null

    // Contar cuántos valores están ingresados
    const valoresIngresados = [v, i, r].filter(val => val !== null && val !== undefined && !isNaN(val)).length

    if (valoresIngresados < 2) {
      setError('Por favor, ingresa al menos dos valores (tensión, corriente o resistencia).')
      return
    }

    if (valoresIngresados === 3) {
      setError('Solo puedes ingresar dos valores. Deja uno vacío para calcularlo.')
      return
    }

    // Verificar que los valores sean positivos
    if ((v !== null && v <= 0) || (i !== null && i <= 0) || (r !== null && r <= 0)) {
      setError('Todos los valores deben ser números positivos.')
      return
    }

    let calculado: { valor: number; unidad: string; variable: string }
    let formula: string
    let calculo: string

    if (v === null) {
      // Calcular tensión: V = I × R
      const valor = i! * r!
      calculado = { valor, unidad: 'V', variable: 'Tensión' }
      formula = 'V = I × R'
      calculo = `${i} A × ${r} Ω = ${valor.toFixed(2)} V`
    } else if (i === null) {
      // Calcular corriente: I = V / R
      const valor = v / r!
      calculado = { valor, unidad: 'A', variable: 'Corriente' }
      formula = 'I = V / R'
      calculo = `${v} V ÷ ${r} Ω = ${valor.toFixed(2)} A`
    } else {
      // Calcular resistencia: R = V / I
      const valor = v / i
      calculado = { valor, unidad: 'Ω', variable: 'Resistencia' }
      formula = 'R = V / I'
      calculo = `${v} V ÷ ${i} A = ${valor.toFixed(2)} Ω`
    }

    // Calcular todas las equivalencias
    const tensionFinal = v !== null ? v : i! * r!
    const corrienteFinal = i !== null ? i : v / r!
    const resistenciaFinal = r !== null ? r : v / i!

    const resultado: LeyOhmResult = {
      calculado,
      formula,
      calculo,
      equivalencias: {
        tension: tensionFinal,
        corriente: corrienteFinal,
        resistencia: resistenciaFinal
      }
    }

    setResultado(resultado)
  }, [tension, corriente, resistencia])

  const resetCalculator = useCallback(() => {
    setTension('')
    setCorriente('')
    setResistencia('')
    setResultado(null)
    setError('')
  }, [])

  const handleExampleClick = useCallback((values: any) => {
    setTension(String(values.tension || ''))
    setCorriente(String(values.corriente || ''))
    setResistencia(String(values.resistencia || ''))
    setError('')
    setResultado(null)
  }, [])

  const examples = [
    {
      title: 'Bombilla LED',
      description: 'Una bombilla LED de 12V con 0.5A de corriente',
      values: {
        tension: '12',
        corriente: '0.5',
        resistencia: ''
      }
    },
    {
      title: 'Resistencia en circuito',
      description: 'Un circuito con 9V y resistencia de 100Ω',
      values: {
        tension: '9',
        corriente: '',
        resistencia: '100'
      }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es la ley de Ohm?",
      answer: "La ley de Ohm establece que la tensión (V) en un conductor es directamente proporcional a la corriente (I) que lo atraviesa, siendo la constante de proporcionalidad la resistencia (R): V = I × R."
    },
    {
      question: "¿Cómo uso la calculadora?",
      answer: "Ingresa dos de los tres valores (tensión, corriente o resistencia) y la calculadora determinará automáticamente el tercero usando la ley de Ohm."
    },
    {
      question: "¿Cuáles son las unidades de medida?",
      answer: "Las unidades son: Voltios (V) para tensión, Amperios (A) para corriente y Ohmios (Ω) para resistencia."
    },
    {
      question: "¿La ley de Ohm se aplica a todos los circuitos?",
      answer: "La ley de Ohm se aplica a conductores óhmicos (resistencia constante). Algunos componentes como diodos y transistores no siguen esta ley lineal."
    }
  ]

  const breadcrumbs = getBreadcrumbs('/fisica/ley-ohm')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Ley de Ohm',
            description: 'Calcula tensión, corriente o resistencia usando la ley de Ohm. Ingresa dos valores para calcular el tercero automáticamente.',
            url: '/fisica/ley-ohm/',
            category: 'Física'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Ley de Ohm - V = I·R"
            description="Calcula tensión, corriente o resistencia usando la ley de Ohm. Ingresa dos valores para calcular el tercero automáticamente."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora asume conductores óhmicos (resistencia constante). Para componentes no lineales se necesitarían métodos más complejos."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Calculadora de Ley de Ohm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Battery className="inline w-4 h-4 mr-1" />
                      Tensión (V)
                    </label>
                    <Input
                      type="number"
                      value={tension}
                      onChange={(e) => setTension(e.target.value)}
                      placeholder="ej: 12"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Deja vacío para calcular</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Activity className="inline w-4 h-4 mr-1" />
                      Corriente (A)
                    </label>
                    <Input
                      type="number"
                      value={corriente}
                      onChange={(e) => setCorriente(e.target.value)}
                      placeholder="ej: 0.5"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Deja vacío para calcular</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Zap className="inline w-4 h-4 mr-1" />
                      Resistencia (Ω)
                    </label>
                    <Input
                      type="number"
                      value={resistencia}
                      onChange={(e) => setResistencia(e.target.value)}
                      placeholder="ej: 100"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Deja vacío para calcular</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={calcularLeyOhm} 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: '#0284c7' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Calcular Ley de Ohm
                  </Button>
                  <Button 
                    onClick={resetCalculator} 
                    variant="outline" 
                    className="border-gray-300 hover:bg-gray-50 sm:w-auto w-full"
                  >
                    Limpiar
                  </Button>
                </div>

                {/* Error */}
                {error && (
                  <Alert variant="destructive">
                    {error}
                  </Alert>
                )}

                {/* Result */}
                {resultado && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Resultado Calculado</h3>
                      <div className="text-2xl font-bold text-blue-600">
                        {resultado.calculado.valor.toFixed(2)} {resultado.calculado.unidad}
                      </div>
                      <p className="text-sm text-blue-700 mt-1">{resultado.calculado.variable}</p>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Fórmula aplicada:</h4>
                      <p className="text-lg font-mono text-gray-700 mb-2">{resultado.formula}</p>
                      <p className="text-sm text-gray-600">{resultado.calculo}</p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Valores del Circuito:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700">Tensión:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.tension.toFixed(2)} V</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Corriente:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.corriente.toFixed(2)} A</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Resistencia:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.resistencia.toFixed(2)} Ω</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
