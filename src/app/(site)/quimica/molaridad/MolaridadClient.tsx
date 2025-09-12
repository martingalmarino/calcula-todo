"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FlaskRound, AlertCircle, Info } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface MolaridadResult {
  molaridad: number
  moles: number
  masaMolar: number
  formula: string
}

export default function MolaridadClient() {
  const [inputType, setInputType] = useState<'moles' | 'grams'>('moles')
  const [moles, setMoles] = useState('')
  const [grams, setGrams] = useState('')
  const [volume, setVolume] = useState('')
  const [molarMass, setMolarMass] = useState('')
  const [results, setResults] = useState<MolaridadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Masas molares comunes (g/mol)
  const commonMolarMasses = {
    'HCl': 36.46,
    'NaOH': 40.00,
    'NaCl': 58.44,
    'H2SO4': 98.08,
    'CaCO3': 100.09,
    'H2O': 18.02,
    'CO2': 44.01,
    'CH4': 16.04,
    'C6H12O6': 180.16,
    'CuSO4': 159.61
  }

  const calculateMolaridad = (): MolaridadResult => {
    const volumeNum = parseFloat(volume)
    let molesNum: number
    let masaMolarNum: number

    if (inputType === 'moles') {
      molesNum = parseFloat(moles)
      masaMolarNum = 0 // No se usa en este caso
    } else {
      const gramsNum = parseFloat(grams)
      masaMolarNum = parseFloat(molarMass)
      molesNum = gramsNum / masaMolarNum
    }

    const molaridad = molesNum / volumeNum

    return {
      molaridad: Math.round(molaridad * 1000) / 1000,
      moles: Math.round(molesNum * 1000) / 1000,
      masaMolar: masaMolarNum,
      formula: inputType === 'moles' ? 'M = n / V' : 'M = (g / MM) / V'
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    if (!volume) {
      setError('Por favor, ingresa el volumen de la solución')
      return
    }

    if (inputType === 'moles' && !moles) {
      setError('Por favor, ingresa la cantidad de moles')
      return
    }

    if (inputType === 'grams' && (!grams || !molarMass)) {
      setError('Por favor, ingresa la masa en gramos y la masa molar')
      return
    }

    try {
      const volumeNum = parseFloat(volume)
      
      if (isNaN(volumeNum) || volumeNum <= 0) {
        setError('El volumen debe ser un número mayor que 0')
        return
      }

      if (inputType === 'moles') {
        const molesNum = parseFloat(moles)
        if (isNaN(molesNum) || molesNum < 0) {
          setError('Los moles deben ser un número mayor o igual a 0')
          return
        }
      } else {
        const gramsNum = parseFloat(grams)
        const molarMassNum = parseFloat(molarMass)
        
        if (isNaN(gramsNum) || gramsNum <= 0) {
          setError('La masa debe ser un número mayor que 0')
          return
        }
        
        if (isNaN(molarMassNum) || molarMassNum <= 0) {
          setError('La masa molar debe ser un número mayor que 0')
          return
        }
      }

      const result = calculateMolaridad()
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la molaridad')
    }
  }

  const breadcrumbs = getBreadcrumbs('/quimica/molaridad')

  const examples = [
    {
      label: 'Ejemplo: 0.5 moles en 2 L',
      values: { inputType: 'moles', moles: '0.5', volume: '2' }
    },
    {
      label: 'Ejemplo: 58.44g NaCl en 1 L',
      values: { inputType: 'grams', grams: '58.44', molarMass: '58.44', volume: '1' }
    },
    {
      label: 'Ejemplo: 40g NaOH en 0.5 L',
      values: { inputType: 'grams', grams: '40', molarMass: '40', volume: '0.5' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la molaridad?',
      answer: 'La molaridad (M) es la concentración de una solución expresada como el número de moles de soluto por litro de solución.'
    },
    {
      question: '¿Cómo se calcula la molaridad?',
      answer: 'La molaridad se calcula dividiendo los moles de soluto entre el volumen de la solución en litros: M = n / V'
    },
    {
      question: '¿Cómo convierto gramos a moles?',
      answer: 'Para convertir gramos a moles, divide la masa en gramos entre la masa molar del compuesto: n = g / MM'
    },
    {
      question: '¿Qué es la masa molar?',
      answer: 'La masa molar es la masa de un mol de una sustancia, expresada en gramos por mol (g/mol). Se calcula sumando las masas atómicas de todos los elementos en la fórmula.'
    },
    {
      question: '¿Cuáles son las unidades de la molaridad?',
      answer: 'La molaridad se expresa en mol/L o M (molar). También se puede expresar como mmol/L para concentraciones muy bajas.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Molaridad',
            description: 'Calcula la concentración molar (M) y convierte entre gramos y moles usando masa molar',
            url: '/quimica/molaridad/',
            category: 'Química'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Molaridad"
            description="Calcula la concentración molar (M) y convierte entre gramos y moles usando masa molar"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values: Record<string, unknown>) => {
              setInputType(values.inputType as 'moles' | 'grams')
              setMoles((values.moles as string) || '')
              setGrams((values.grams as string) || '')
              setMolarMass((values.molarMass as string) || '')
              setVolume((values.volume as string) || '')
              setResults(null)
              setError(null)
            }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskRound className="w-5 h-5 text-emerald-600" />
                  Calculadora de Molaridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de entrada</label>
                  <Select value={inputType} onValueChange={(value: 'moles' | 'grams') => setInputType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moles">Moles de soluto</SelectItem>
                      <SelectItem value="grams">Gramos de soluto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {inputType === 'moles' ? (
                  <div className="space-y-2">
                    <label htmlFor="moles" className="text-sm font-medium">
                      Moles de soluto (mol)
                    </label>
                    <Input
                      id="moles"
                      type="number"
                      step="any"
                      placeholder="Ej: 0.5"
                      value={moles}
                      onChange={(e) => setMoles(e.target.value)}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="grams" className="text-sm font-medium">
                        Masa de soluto (g)
                      </label>
                      <Input
                        id="grams"
                        type="number"
                        step="any"
                        placeholder="Ej: 58.44"
                        value={grams}
                        onChange={(e) => setGrams(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="molarMass" className="text-sm font-medium">
                        Masa molar (g/mol)
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="molarMass"
                          type="number"
                          step="any"
                          placeholder="Ej: 58.44"
                          value={molarMass}
                          onChange={(e) => setMolarMass(e.target.value)}
                          className="flex-1"
                        />
                        <Select onValueChange={(value) => setMolarMass(value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Común" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(commonMolarMasses).map(([compound, mass]) => (
                              <SelectItem key={compound} value={mass.toString()}>
                                {compound}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label htmlFor="volume" className="text-sm font-medium">
                    Volumen de solución (L)
                  </label>
                  <Input
                    id="volume"
                    type="number"
                    step="any"
                    placeholder="Ej: 1"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full"
                  />
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
                  <FlaskRound className="h-4 w-4 mr-2" />
                  Calcular Molaridad
                </Button>

                {results && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        M = {results.molaridad} M
                      </div>
                      <div className="text-lg text-gray-600">
                        {results.molaridad} mol/L
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
                          <strong>Moles calculados:</strong> {results.moles} mol
                        </span>
                      </div>
                      {inputType === 'grams' && (
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">
                            <strong>Masa molar utilizada:</strong> {results.masaMolar} g/mol
                          </span>
                        </div>
                      )}
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
