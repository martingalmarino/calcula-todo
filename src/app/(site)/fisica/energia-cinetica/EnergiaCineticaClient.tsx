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
import { Battery, Scale, Zap } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface EnergiaCineticaResult {
  energia: number
  unidad: string
  formula: string
  calculo: string
  equivalencias: {
    joules: number
    kcal: number
    wh: number
  }
}

export function EnergiaCineticaClient() {
  const [masa, setMasa] = useState('')
  const [unidadMasa, setUnidadMasa] = useState('kg')
  const [velocidad, setVelocidad] = useState('')
  const [unidadVelocidad, setUnidadVelocidad] = useState('m/s')
  const [resultado, setResultado] = useState<EnergiaCineticaResult | null>(null)
  const [error, setError] = useState('')

  const calcularEnergiaCinetica = useCallback(() => {
    setError('')
    setResultado(null)

    if (!masa || !velocidad) {
      setError('Por favor, ingresa tanto la masa como la velocidad.')
      return
    }

    const m = parseFloat(masa)
    const v = parseFloat(velocidad)

    if (isNaN(m) || isNaN(v) || m <= 0 || v < 0) {
      setError('La masa debe ser positiva y la velocidad no puede ser negativa.')
      return
    }

    // Convertir a unidades base (kg y m/s)
    let masaEnKg = m
    let velocidadEnMs = v

    // Conversión de masa
    switch (unidadMasa) {
      case 'g':
        masaEnKg = m / 1000
        break
      case 'lb':
        masaEnKg = m * 0.453592
        break
    }

    // Conversión de velocidad
    switch (unidadVelocidad) {
      case 'km/h':
        velocidadEnMs = v / 3.6
        break
      case 'mph':
        velocidadEnMs = v * 0.44704
        break
      case 'ft/s':
        velocidadEnMs = v * 0.3048
        break
    }

    // Calcular energía cinética en Joules
    const energiaJoules = 0.5 * masaEnKg * Math.pow(velocidadEnMs, 2)

    // Conversiones a otras unidades
    const energiaKcal = energiaJoules / 4184
    const energiaWh = energiaJoules / 3600

    const resultado: EnergiaCineticaResult = {
      energia: energiaJoules,
      unidad: 'J',
      formula: 'Ec = ½·m·v²',
      calculo: `½ × ${masaEnKg.toFixed(2)} kg × (${velocidadEnMs.toFixed(2)} m/s)² = ${energiaJoules.toFixed(2)} J`,
      equivalencias: {
        joules: energiaJoules,
        kcal: energiaKcal,
        wh: energiaWh
      }
    }

    setResultado(resultado)
  }, [masa, unidadMasa, velocidad, unidadVelocidad])

  const resetCalculator = useCallback(() => {
    setMasa('')
    setUnidadMasa('kg')
    setVelocidad('')
    setUnidadVelocidad('m/s')
    setResultado(null)
    setError('')
  }, [])

  const handleExampleClick = useCallback((values: { masa?: string; unidadMasa?: string; velocidad?: string; unidadVelocidad?: string }) => {
    setMasa(String(values.masa || ''))
    setUnidadMasa(values.unidadMasa || 'kg')
    setVelocidad(String(values.velocidad || ''))
    setUnidadVelocidad(values.unidadVelocidad || 'm/s')
    setError('')
    setResultado(null)
  }, [])

  const examples = [
    {
      label: 'Bala de rifle - Una bala de 10g viajando a 800 m/s',
      values: {
        masa: '10',
        unidadMasa: 'g',
        velocidad: '800',
        unidadVelocidad: 'm/s'
      }
    },
    {
      label: 'Coche en autopista - Un coche de 1500 kg a 120 km/h',
      values: {
        masa: '1500',
        unidadMasa: 'kg',
        velocidad: '120',
        unidadVelocidad: 'km/h'
      }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es la energía cinética?",
      answer: "La energía cinética es la energía que posee un objeto debido a su movimiento. Se calcula con la fórmula Ec = ½·m·v², donde m es la masa y v la velocidad."
    },
    {
      question: "¿Por qué la velocidad está al cuadrado en la fórmula?",
      answer: "La velocidad está al cuadrado porque la energía cinética aumenta cuadráticamente con la velocidad. Duplicar la velocidad cuadruplica la energía cinética."
    },
    {
      question: "¿Cuáles son las unidades de energía?",
      answer: "La unidad fundamental de energía en el SI es el Joule (J). También se usan kilocalorías (kcal) y vatios-hora (Wh) para diferentes contextos."
    },
    {
      question: "¿La energía cinética puede ser negativa?",
      answer: "No, la energía cinética siempre es positiva o cero. Si la velocidad es cero, la energía cinética es cero. No puede ser negativa."
    }
  ]

  const breadcrumbs = getBreadcrumbs('/fisica/energia-cinetica')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Energía Cinética',
            description: 'Calcula energía cinética usando la fórmula Ec = ½·m·v². Ingresa masa y velocidad para obtener energía en Joules.',
            url: '/fisica/energia-cinetica/',
            category: 'Física'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Energía Cinética - Ec = ½·m·v²"
            description="Calcula energía cinética usando la fórmula Ec = ½·m·v². Ingresa masa y velocidad para obtener energía en Joules con conversiones automáticas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora asume movimiento en línea recta sin fricción. Para movimientos complejos se necesitarían consideraciones adicionales."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Calculadora de Energía Cinética
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Scale className="inline w-4 h-4 mr-1" />
                      Masa
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={masa}
                        onChange={(e) => setMasa(e.target.value)}
                        placeholder="ej: 5"
                        className="flex-1"
                      />
                      <Select value={unidadMasa} onValueChange={setUnidadMasa}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Zap className="inline w-4 h-4 mr-1" />
                      Velocidad
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={velocidad}
                        onChange={(e) => setVelocidad(e.target.value)}
                        placeholder="ej: 10"
                        className="flex-1"
                      />
                      <Select value={unidadVelocidad} onValueChange={setUnidadVelocidad}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m/s">m/s</SelectItem>
                          <SelectItem value="km/h">km/h</SelectItem>
                          <SelectItem value="mph">mph</SelectItem>
                          <SelectItem value="ft/s">ft/s</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={calcularEnergiaCinetica} 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: '#0284c7' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <Battery className="w-4 h-4 mr-2" />
                    Calcular Energía Cinética
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
                      <h3 className="font-semibold text-blue-900 mb-2">Resultado</h3>
                      <div className="text-2xl font-bold text-blue-600">
                        {resultado.energia.toFixed(2)} {resultado.unidad}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Fórmula aplicada:</h4>
                      <p className="text-lg font-mono text-gray-700 mb-2">{resultado.formula}</p>
                      <p className="text-sm text-gray-600">{resultado.calculo}</p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Conversiones:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700">Joules (J):</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.joules.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">kcal:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.kcal.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Wh:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.wh.toFixed(4)}</span>
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
