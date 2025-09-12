"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Wind, AlertCircle, Info } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface GasesIdealesResult {
  calculatedValue: number
  unit: string
  formula: string
  constantR: number
  constantRUnit: string
}

export default function GasesIdealesClient() {
  const [variableToCalculate, setVariableToCalculate] = useState<'P' | 'V' | 'n' | 'T'>('P')
  const [pressure, setPressure] = useState('')
  const [volume, setVolume] = useState('')
  const [moles, setMoles] = useState('')
  const [temperature, setTemperature] = useState('')
  const [pressureUnit, setPressureUnit] = useState('atm')
  const [volumeUnit, setVolumeUnit] = useState('L')
  const [temperatureUnit, setTemperatureUnit] = useState('K')
  const [results, setResults] = useState<GasesIdealesResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Constante R en diferentes unidades
  const R_CONSTANTS = {
    'atm-L/mol-K': 0.08206,
    'Pa-m³/mol-K': 8.314,
    'kPa-L/mol-K': 8.314,
    'bar-L/mol-K': 0.08314,
    'mmHg-L/mol-K': 62.36
  }

  const getRConstant = () => {
    const key = `${pressureUnit}-${volumeUnit}/mol-${temperatureUnit}`
    return R_CONSTANTS[key as keyof typeof R_CONSTANTS] || R_CONSTANTS['atm-L/mol-K']
  }

  const calculateVariable = (): GasesIdealesResult => {
    const R = getRConstant()
    let calculatedValue: number
    let unit: string
    let formula: string

    const P = parseFloat(pressure) || 0
    const V = parseFloat(volume) || 0
    const n = parseFloat(moles) || 0
    const T = parseFloat(temperature) || 0

    switch (variableToCalculate) {
      case 'P':
        calculatedValue = (n * R * T) / V
        unit = pressureUnit
        formula = 'P = nRT / V'
        break
      case 'V':
        calculatedValue = (n * R * T) / P
        unit = volumeUnit
        formula = 'V = nRT / P'
        break
      case 'n':
        calculatedValue = (P * V) / (R * T)
        unit = 'mol'
        formula = 'n = PV / RT'
        break
      case 'T':
        calculatedValue = (P * V) / (n * R)
        unit = temperatureUnit
        formula = 'T = PV / nR'
        break
      default:
        calculatedValue = 0
        unit = ''
        formula = ''
    }

    return {
      calculatedValue: Math.round(calculatedValue * 1000) / 1000,
      unit,
      formula,
      constantR: R,
      constantRUnit: `${pressureUnit}-${volumeUnit}/mol-${temperatureUnit}`
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    const P = parseFloat(pressure)
    const V = parseFloat(volume)
    const n = parseFloat(moles)
    const T = parseFloat(temperature)

    // Verificar que se ingresaron exactamente 3 valores
    const enteredValues = [P, V, n, T].filter(val => !isNaN(val) && val > 0)
    
    if (enteredValues.length !== 3) {
      setError('Por favor, ingresa exactamente 3 de los 4 valores (P, V, n, T)')
      return
    }

    // Verificar que el valor a calcular no esté ingresado
    const values = { P, V, n, T }
    if (!isNaN(values[variableToCalculate]) && values[variableToCalculate] > 0) {
      setError(`El valor de ${variableToCalculate} no debe estar ingresado ya que es el que se va a calcular`)
      return
    }

    try {
      const result = calculateVariable()
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular')
    }
  }

  const breadcrumbs = getBreadcrumbs('/quimica/gases-ideales')

  const examples = [
    {
      label: 'Ejemplo: Calcular presión',
      values: { variableToCalculate: 'P', volume: '2', moles: '1', temperature: '298', pressureUnit: 'atm', volumeUnit: 'L', temperatureUnit: 'K' }
    },
    {
      label: 'Ejemplo: Calcular volumen',
      values: { variableToCalculate: 'V', pressure: '1', moles: '0.5', temperature: '273', pressureUnit: 'atm', volumeUnit: 'L', temperatureUnit: 'K' }
    },
    {
      label: 'Ejemplo: Calcular moles',
      values: { variableToCalculate: 'n', pressure: '2', volume: '5', temperature: '300', pressureUnit: 'atm', volumeUnit: 'L', temperatureUnit: 'K' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la ley de gases ideales?',
      answer: 'La ley de gases ideales relaciona la presión (P), volumen (V), número de moles (n) y temperatura (T) de un gas ideal mediante la ecuación PV = nRT.'
    },
    {
      question: '¿Qué es la constante R?',
      answer: 'R es la constante universal de los gases. Su valor depende de las unidades utilizadas: 0.08206 atm·L/mol·K, 8.314 Pa·m³/mol·K, etc.'
    },
    {
      question: '¿Cuándo se aplica la ley de gases ideales?',
      answer: 'La ley de gases ideales se aplica a gases a bajas presiones y altas temperaturas, donde las interacciones moleculares son despreciables.'
    },
    {
      question: '¿Qué unidades debo usar?',
      answer: 'Puedes usar diferentes unidades, pero asegúrate de que la constante R sea compatible. Las más comunes son: atm-L/mol-K, Pa-m³/mol-K, kPa-L/mol-K.'
    },
    {
      question: '¿Cómo convierto entre unidades de temperatura?',
      answer: 'Para convertir a Kelvin: K = °C + 273.15. Para convertir a Celsius: °C = K - 273.15. Para Fahrenheit: K = (°F + 459.67) × 5/9.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Ley de Gases Ideales',
            description: 'Aplica la ecuación PV = nRT para calcular presión, volumen, moles o temperatura',
            url: '/quimica/gases-ideales/',
            category: 'Química'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Ley de Gases Ideales"
            description="Aplica la ecuación PV = nRT para calcular presión, volumen, moles o temperatura"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values: Record<string, unknown>) => {
              setVariableToCalculate(values.variableToCalculate as 'P' | 'V' | 'n' | 'T')
              setPressure(values.pressure || '')
              setVolume(values.volume || '')
              setMoles(values.moles || '')
              setTemperature(values.temperature || '')
              setPressureUnit(values.pressureUnit || 'atm')
              setVolumeUnit(values.volumeUnit || 'L')
              setTemperatureUnit(values.temperatureUnit || 'K')
              setResults(null)
              setError(null)
            }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-emerald-600" />
                  Ley de Gases Ideales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Variable a calcular</label>
                  <Select value={variableToCalculate} onValueChange={(value: 'P' | 'V' | 'n' | 'T') => setVariableToCalculate(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P">Presión (P)</SelectItem>
                      <SelectItem value="V">Volumen (V)</SelectItem>
                      <SelectItem value="n">Moles (n)</SelectItem>
                      <SelectItem value="T">Temperatura (T)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="pressure" className="text-sm font-medium">
                      Presión (P)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="pressure"
                        type="number"
                        step="any"
                        placeholder="Ej: 1"
                        value={pressure}
                        onChange={(e) => setPressure(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'P'}
                      />
                      <Select value={pressureUnit} onValueChange={setPressureUnit}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atm">atm</SelectItem>
                          <SelectItem value="Pa">Pa</SelectItem>
                          <SelectItem value="kPa">kPa</SelectItem>
                          <SelectItem value="bar">bar</SelectItem>
                          <SelectItem value="mmHg">mmHg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volume" className="text-sm font-medium">
                      Volumen (V)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="volume"
                        type="number"
                        step="any"
                        placeholder="Ej: 2"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'V'}
                      />
                      <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="m³">m³</SelectItem>
                          <SelectItem value="mL">mL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="moles" className="text-sm font-medium">
                      Moles (n)
                    </label>
                    <Input
                      id="moles"
                      type="number"
                      step="any"
                      placeholder="Ej: 1"
                      value={moles}
                      onChange={(e) => setMoles(e.target.value)}
                      className="w-full"
                      disabled={variableToCalculate === 'n'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="temperature" className="text-sm font-medium">
                      Temperatura (T)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="temperature"
                        type="number"
                        step="any"
                        placeholder="Ej: 298"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'T'}
                      />
                      <Select value={temperatureUnit} onValueChange={setTemperatureUnit}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="K">K</SelectItem>
                          <SelectItem value="°C">°C</SelectItem>
                          <SelectItem value="°F">°F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">{error}</span>
                  </div>
                )}

                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Calcular {variableToCalculate}
                </Button>

                {results && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {variableToCalculate} = {results.calculatedValue} {results.unit}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Fórmula utilizada:</strong> {results.formula}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Constante R:</strong> {results.constantR} {results.constantRUnit}
                        </span>
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
