"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Droplets, AlertCircle, Info } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface DilucionesResult {
  calculatedValue: number
  unit: string
  formula: string
  dilutionFactor: number
  dilutionRatio: string
}

export default function DilucionesClient() {
  const [variableToCalculate, setVariableToCalculate] = useState<'C1' | 'V1' | 'C2' | 'V2'>('C2')
  const [concentration1, setConcentration1] = useState('')
  const [volume1, setVolume1] = useState('')
  const [concentration2, setConcentration2] = useState('')
  const [volume2, setVolume2] = useState('')
  const [concentrationUnit, setConcentrationUnit] = useState('M')
  const [volumeUnit, setVolumeUnit] = useState('L')
  const [results, setResults] = useState<DilucionesResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateVariable = (): DilucionesResult => {
    let calculatedValue: number
    let unit: string
    let formula: string

    const C1 = parseFloat(concentration1) || 0
    const V1 = parseFloat(volume1) || 0
    const C2 = parseFloat(concentration2) || 0
    const V2 = parseFloat(volume2) || 0

    switch (variableToCalculate) {
      case 'C1':
        calculatedValue = (C2 * V2) / V1
        unit = concentrationUnit
        formula = 'C1 = C2V2 / V1'
        break
      case 'V1':
        calculatedValue = (C2 * V2) / C1
        unit = volumeUnit
        formula = 'V1 = C2V2 / C1'
        break
      case 'C2':
        calculatedValue = (C1 * V1) / V2
        unit = concentrationUnit
        formula = 'C2 = C1V1 / V2'
        break
      case 'V2':
        calculatedValue = (C1 * V1) / C2
        unit = volumeUnit
        formula = 'V2 = C1V1 / C2'
        break
      default:
        calculatedValue = 0
        unit = ''
        formula = ''
    }

    // Calcular factor de dilución
    const dilutionFactor = C1 / (calculatedValue || C2)
    const dilutionRatio = `1:${Math.round(dilutionFactor)}`

    return {
      calculatedValue: Math.round(calculatedValue * 1000) / 1000,
      unit,
      formula,
      dilutionFactor: Math.round(dilutionFactor * 100) / 100,
      dilutionRatio
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    const C1 = parseFloat(concentration1)
    const V1 = parseFloat(volume1)
    const C2 = parseFloat(concentration2)
    const V2 = parseFloat(volume2)

    // Verificar que se ingresaron exactamente 3 valores
    const enteredValues = [C1, V1, C2, V2].filter(val => !isNaN(val) && val > 0)
    
    if (enteredValues.length !== 3) {
      setError('Por favor, ingresa exactamente 3 de los 4 valores (C1, V1, C2, V2)')
      return
    }

    // Verificar que el valor a calcular no esté ingresado
    const values = { C1, V1, C2, V2 }
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

  const breadcrumbs = getBreadcrumbs('/quimica/diluciones')

  const examples = [
    {
      label: 'Ejemplo: Diluir 1M a 0.1M',
      values: { variableToCalculate: 'V2', concentration1: '1', volume1: '0.1', concentration2: '0.1', concentrationUnit: 'M', volumeUnit: 'L' }
    },
    {
      label: 'Ejemplo: Calcular volumen inicial',
      values: { variableToCalculate: 'V1', concentration1: '2', concentration2: '0.5', volume2: '1', concentrationUnit: 'M', volumeUnit: 'L' }
    },
    {
      label: 'Ejemplo: Calcular concentración final',
      values: { variableToCalculate: 'C2', concentration1: '5', volume1: '0.2', volume2: '1', concentrationUnit: 'M', volumeUnit: 'L' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la fórmula de dilución?',
      answer: 'La fórmula de dilución C1V1 = C2V2 relaciona la concentración y volumen iniciales con la concentración y volumen finales en una dilución.'
    },
    {
      question: '¿Cómo funciona la dilución?',
      answer: 'En una dilución, se agrega solvente a una solución concentrada para reducir su concentración. La cantidad de soluto permanece constante.'
    },
    {
      question: '¿Qué es el factor de dilución?',
      answer: 'El factor de dilución es la relación entre la concentración inicial y final. Indica cuántas veces se diluye la solución.'
    },
    {
      question: '¿Cómo interpreto la relación de dilución?',
      answer: 'Una relación 1:10 significa que por cada 1 parte de solución concentrada, se agregan 9 partes de solvente para obtener 10 partes de solución diluida.'
    },
    {
      question: '¿Qué unidades puedo usar?',
      answer: 'Puedes usar cualquier unidad de concentración (M, mM, μM, etc.) y volumen (L, mL, μL, etc.), pero asegúrate de que sean consistentes.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Diluciones',
            description: 'Aplica la fórmula C1V1 = C2V2 para calcular concentraciones y volúmenes en diluciones',
            url: '/quimica/diluciones/',
            category: 'Química'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Diluciones"
            description="Aplica la fórmula C1V1 = C2V2 para calcular concentraciones y volúmenes en diluciones"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values: Record<string, unknown>) => {
              setVariableToCalculate(values.variableToCalculate as 'C1' | 'V1' | 'C2' | 'V2')
              setConcentration1((values.concentration1 as string) || '')
              setVolume1((values.volume1 as string) || '')
              setConcentration2((values.concentration2 as string) || '')
              setVolume2((values.volume2 as string) || '')
              setConcentrationUnit((values.concentrationUnit as string) || 'M')
              setVolumeUnit((values.volumeUnit as string) || 'L')
              setResults(null)
              setError(null)
            }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-emerald-600" />
                  Calculadora de Diluciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Variable a calcular</label>
                  <Select value={variableToCalculate} onValueChange={(value: 'C1' | 'V1' | 'C2' | 'V2') => setVariableToCalculate(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C1">Concentración inicial (C1)</SelectItem>
                      <SelectItem value="V1">Volumen inicial (V1)</SelectItem>
                      <SelectItem value="C2">Concentración final (C2)</SelectItem>
                      <SelectItem value="V2">Volumen final (V2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="concentration1" className="text-sm font-medium">
                      Concentración inicial (C1)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="concentration1"
                        type="number"
                        step="any"
                        placeholder="Ej: 1"
                        value={concentration1}
                        onChange={(e) => setConcentration1(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'C1'}
                      />
                      <Select value={concentrationUnit} onValueChange={setConcentrationUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="mM">mM</SelectItem>
                          <SelectItem value="μM">μM</SelectItem>
                          <SelectItem value="nM">nM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volume1" className="text-sm font-medium">
                      Volumen inicial (V1)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="volume1"
                        type="number"
                        step="any"
                        placeholder="Ej: 0.1"
                        value={volume1}
                        onChange={(e) => setVolume1(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'V1'}
                      />
                      <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="mL">mL</SelectItem>
                          <SelectItem value="μL">μL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="concentration2" className="text-sm font-medium">
                      Concentración final (C2)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="concentration2"
                        type="number"
                        step="any"
                        placeholder="Ej: 0.1"
                        value={concentration2}
                        onChange={(e) => setConcentration2(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'C2'}
                      />
                      <Select value={concentrationUnit} onValueChange={setConcentrationUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="mM">mM</SelectItem>
                          <SelectItem value="μM">μM</SelectItem>
                          <SelectItem value="nM">nM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volume2" className="text-sm font-medium">
                      Volumen final (V2)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="volume2"
                        type="number"
                        step="any"
                        placeholder="Ej: 1"
                        value={volume2}
                        onChange={(e) => setVolume2(e.target.value)}
                        className="flex-1"
                        disabled={variableToCalculate === 'V2'}
                      />
                      <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="mL">mL</SelectItem>
                          <SelectItem value="μL">μL</SelectItem>
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
                  className="w-full calculator-button"
                >
                  <Droplets className="h-4 w-4 mr-2" />
                  Calcular {variableToCalculate}
                </Button>

                {results && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {variableToCalculate} = {results.calculatedValue} {results.unit}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-semibold text-blue-600">Factor de Dilución</div>
                        <div className="text-lg font-bold">{results.dilutionFactor}</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-semibold text-green-600">Relación</div>
                        <div className="text-lg font-bold">{results.dilutionRatio}</div>
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
                          <strong>Ecuación general:</strong> C1V1 = C2V2
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
