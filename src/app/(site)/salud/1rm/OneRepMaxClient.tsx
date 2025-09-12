"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dumbbell, AlertCircle, Info, Zap, Target, TrendingUp } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface OneRepMaxResult {
  peso: number
  repeticiones: number
  formula: string
  rmEpley: number
  rmBrzycki: number
  diferencia: number
  porcentajes: {
    '90%': number
    '85%': number
    '80%': number
    '75%': number
    '70%': number
    '65%': number
    '60%': number
  }
  recomendaciones: string[]
}

export default function OneRepMaxClient() {
  const [peso, setPeso] = useState('')
  const [repeticiones, setRepeticiones] = useState('')
  const [results, setResults] = useState<OneRepMaxResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const breadcrumbs = getBreadcrumbs('/salud/1rm/')

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      const pesoNum = parseFloat(peso)
      const repeticionesNum = parseInt(repeticiones)

      if (!pesoNum || pesoNum <= 0) {
        setError('Por favor ingresa un peso válido')
        return
      }

      if (!repeticionesNum || repeticionesNum <= 0) {
        setError('Por favor ingresa un número de repeticiones válido')
        return
      }

      if (repeticionesNum > 20) {
        setError('Para obtener resultados precisos, usa entre 1 y 20 repeticiones')
        return
      }

      // Fórmula de Epley: 1RM = Peso × (1 + (Repeticiones / 30))
      const rmEpley = pesoNum * (1 + (repeticionesNum / 30))

      // Fórmula de Brzycki: 1RM = Peso / (1.0278 - (0.0278 × Repeticiones))
      const rmBrzycki = pesoNum / (1.0278 - (0.0278 * repeticionesNum))

      const diferencia = Math.abs(rmEpley - rmBrzycki)

      // Calcular porcentajes del 1RM
      const porcentajes = {
        '90%': Math.round(rmEpley * 0.9),
        '85%': Math.round(rmEpley * 0.85),
        '80%': Math.round(rmEpley * 0.8),
        '75%': Math.round(rmEpley * 0.75),
        '70%': Math.round(rmEpley * 0.7),
        '65%': Math.round(rmEpley * 0.65),
        '60%': Math.round(rmEpley * 0.6)
      }

      // Recomendaciones basadas en el 1RM
      const recomendaciones = []
      
      if (rmEpley < 50) {
        recomendaciones.push('Enfócate en la técnica y progresión gradual')
        recomendaciones.push('Trabaja con pesos del 60-70% de tu 1RM')
        recomendaciones.push('Realiza 8-12 repeticiones por serie')
      } else if (rmEpley < 100) {
        recomendaciones.push('Incluye entrenamientos de fuerza e hipertrofia')
        recomendaciones.push('Alterna entre 70-80% y 80-90% de tu 1RM')
        recomendaciones.push('Combina series de 5-8 y 8-12 repeticiones')
      } else {
        recomendaciones.push('Trabaja en fuerza máxima y potencia')
        recomendaciones.push('Incluye entrenamientos con 85-95% de tu 1RM')
        recomendaciones.push('Realiza series de 1-5 repeticiones')
      }

      recomendaciones.push('Descansa 2-5 minutos entre series pesadas')
      recomendaciones.push('Progresiona gradualmente cada 2-4 semanas')

      setResults({
        peso: pesoNum,
        repeticiones: repeticionesNum,
        formula: 'Epley y Brzycki',
        rmEpley: Math.round(rmEpley),
        rmBrzycki: Math.round(rmBrzycki),
        diferencia: Math.round(diferencia),
        porcentajes,
        recomendaciones
      })
    } catch (err) {
      setError('Error en el cálculo. Verifica los datos ingresados.')
    }
  }

  const examples = [
    {
      label: 'Press de banca - 80kg x 8 reps',
      title: 'Press de banca - 80kg x 8 reps',
      description: 'Press de banca con 80kg por 8 repeticiones',
      values: {
        peso: '80',
        repeticiones: '8'
      }
    },
    {
      label: 'Sentadilla - 100kg x 5 reps',
      title: 'Sentadilla - 100kg x 5 reps',
      description: 'Sentadilla con 100kg por 5 repeticiones',
      values: {
        peso: '100',
        repeticiones: '5'
      }
    },
    {
      label: 'Peso muerto - 120kg x 3 reps',
      title: 'Peso muerto - 120kg x 3 reps',
      description: 'Peso muerto con 120kg por 3 repeticiones',
      values: {
        peso: '120',
        repeticiones: '3'
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el 1RM?',
      answer: 'El 1RM (One Rep Max) es el peso máximo que puedes levantar una sola vez con la técnica correcta. Es una medida estándar de fuerza máxima.'
    },
    {
      question: '¿Cuál es la diferencia entre las fórmulas de Epley y Brzycki?',
      answer: 'La fórmula de Epley es más conservadora y tiende a subestimar el 1RM, mientras que Brzycki puede sobreestimarlo. Ambas son válidas para estimaciones.'
    },
    {
      question: '¿Con cuántas repeticiones es más preciso el cálculo?',
      answer: 'El cálculo es más preciso con 1-10 repeticiones. Con más de 10 reps, las estimaciones pueden ser menos confiables.'
    },
    {
      question: '¿Cómo uso los porcentajes del 1RM?',
      answer: 'Los porcentajes te ayudan a planificar entrenamientos: 60-70% para hipertrofia (8-12 reps), 80-90% para fuerza (3-6 reps), 90%+ para fuerza máxima (1-3 reps).'
    },
    {
      question: '¿Con qué frecuencia debo probar mi 1RM?',
      answer: 'No más de una vez cada 4-6 semanas. Probar el 1RM es muy exigente y requiere recuperación completa. Usa estimaciones para el seguimiento regular.'
    }
  ]

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />
      
      <CalculatorLayout
        title="Calculadora de 1RM (One Rep Max)"
        description="Calcula tu máximo de una repetición usando las fórmulas de Epley o Brzycki"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={(values: Record<string, unknown>) => {
          setPeso((values.peso as string) || '')
          setRepeticiones((values.repeticiones as string) || '')
          setResults(null)
          setError(null)
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-blue-600" />
              One Rep Max
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso levantado (kg)
              </label>
              <Input
                type="number"
                step="0.5"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ej: 80, 100, 120"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeticiones realizadas
              </label>
              <Input
                type="number"
                value={repeticiones}
                onChange={(e) => setRepeticiones(e.target.value)}
                placeholder="Ej: 5, 8, 10"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Para mayor precisión, usa entre 1 y 10 repeticiones
              </p>
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
              <Zap className="h-4 w-4 mr-2" />
              Calcular 1RM
            </Button>

            {results && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {results.rmEpley} kg
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimación de 1RM (Fórmula de Epley)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Peso usado</div>
                    <div className="text-gray-600">{results.peso} kg</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Repeticiones</div>
                    <div className="text-gray-600">{results.repeticiones}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">1RM (Epley)</div>
                    <div className="text-gray-600">{results.rmEpley} kg</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">1RM (Brzycki)</div>
                    <div className="text-gray-600">{results.rmBrzycki} kg</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Porcentajes del 1RM</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                    <div>90%: {results.porcentajes['90%']} kg</div>
                    <div>85%: {results.porcentajes['85%']} kg</div>
                    <div>80%: {results.porcentajes['80%']} kg</div>
                    <div>75%: {results.porcentajes['75%']} kg</div>
                    <div>70%: {results.porcentajes['70%']} kg</div>
                    <div>65%: {results.porcentajes['65%']} kg</div>
                    <div>60%: {results.porcentajes['60%']} kg</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Recomendaciones de entrenamiento</span>
                  </div>
                  <div className="text-sm text-green-800">
                    <ul className="list-disc list-inside space-y-1">
                      {results.recomendaciones.map((recomendacion, index) => (
                        <li key={index}>{recomendacion}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Información adicional</span>
                  </div>
                  <div className="text-sm text-yellow-800">
                    • Diferencia entre fórmulas: {results.diferencia} kg<br/>
                    • Promedio de ambas: {Math.round((results.rmEpley + results.rmBrzycki) / 2)} kg<br/>
                    • Intensidad actual: {Math.round((results.peso / results.rmEpley) * 100)}% del 1RM
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </CalculatorLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de 1RM (One Rep Max)',
            description: 'Calcula tu máximo de una repetición usando las fórmulas de Epley o Brzycki',
            url: 'https://calculatodo.online/salud/1rm/',
            category: 'Salud'
          })
        }}
      />
    </Container>
  )
}
