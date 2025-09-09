"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar, Heart, AlertCircle } from 'lucide-react'
import { calculateOvulation, type OvulationResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function OvulacionClient() {
  const [lastPeriod, setLastPeriod] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [results, setResults] = useState<OvulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!lastPeriod) {
      setError('Por favor, selecciona la fecha de tu último período')
      return
    }

    try {
      const cycleLengthNum = parseInt(cycleLength)
      
      if (isNaN(cycleLengthNum)) {
        setError('Por favor, ingresa una duración de ciclo válida')
        return
      }

      const result = calculateOvulation(lastPeriod, cycleLengthNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la ovulación')
    }
  }

  const breadcrumbs = getBreadcrumbs('/salud/ovulacion')

  const examples = [
    {
      label: 'Ejemplo: Último período 1 enero 2024, ciclo 28 días',
      values: { lastPeriod: '2024-01-01', cycleLength: '28' }
    },
    {
      label: 'Ejemplo: Último período 15 marzo 2024, ciclo 30 días',
      values: { lastPeriod: '2024-03-15', cycleLength: '30' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calcula la ovulación?',
      answer: 'La ovulación ocurre aproximadamente 14 días antes del próximo período menstrual.'
    },
    {
      question: '¿Qué es la ventana fértil?',
      answer: 'Son los días más fértiles del ciclo, incluyendo 5 días antes de la ovulación y el día de ovulación.'
    },
    {
      question: '¿Son precisos estos cálculos?',
      answer: 'Son estimaciones basadas en ciclos regulares. Para mayor precisión, consulta con un ginecólogo.'
    },
    {
      question: '¿Qué factores pueden afectar la ovulación?',
      answer: 'Estrés, enfermedad, medicamentos, cambios de peso y ejercicio excesivo pueden alterar el ciclo.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Ovulación y Días Fértiles - Ciclo Menstrual',
            description: 'Calcula tu ventana fértil, próxima ovulación y ciclo menstrual',
            url: '/salud/ovulacion/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Ovulación y Días Fértiles - Ciclo Menstrual"
            description="Calcula tu ventana fértil, próxima ovulación y ciclo menstrual"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setLastPeriod(values.lastPeriod as string)
              setCycleLength(values.cycleLength as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Calculadora de Ovulación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fecha del Último Período
                    </label>
                    <Input
                      type="date"
                      value={lastPeriod}
                      onChange={(e) => setLastPeriod(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Duración del Ciclo (días)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 28"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(e.target.value)}
                      className="w-full"
                      min="21"
                      max="35"
                      step="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ciclo típico: 21-35 días (promedio: 28 días)
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calcular Ovulación
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {results && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Resultados del Ciclo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-pink-50 rounded-lg">
                          <div className="text-lg font-bold text-pink-600 mb-1">
                            {results.nextOvulation}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Próxima Ovulación
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600 mb-1">
                            {results.fertileWindow.start}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Inicio Ventana Fértil
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600 mb-1">
                            {results.nextPeriod}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Próximo Período
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2 text-yellow-800">📅 Ventana Fértil:</h4>
                        <div className="text-sm text-yellow-700">
                          <p><strong>Desde:</strong> {results.fertileWindow.start}</p>
                          <p><strong>Hasta:</strong> {results.fertileWindow.end}</p>
                          <p><strong>Duración del ciclo:</strong> {results.cycleLength} días</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Información Importante:</h4>
                        <ul className="space-y-2 text-sm">
                          {results.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-600 mt-1">•</span>
                              <span>{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
