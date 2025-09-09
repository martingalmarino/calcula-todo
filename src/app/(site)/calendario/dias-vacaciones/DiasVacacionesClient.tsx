"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plane, AlertCircle } from 'lucide-react'
import { calculateVacationDays, type VacationDaysResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function DiasVacacionesClient() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<VacationDaysResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Por favor, selecciona ambas fechas')
      return
    }

    try {
      const result = calculateVacationDays(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular los días de vacaciones')
    }
  }

  const breadcrumbs = getBreadcrumbs('/calendario/dias-vacaciones')

  const examples = [
    {
      label: 'Ejemplo: 1 enero 2024 a 5 enero 2024',
      values: { startDate: '2024-01-01', endDate: '2024-01-05' }
    },
    {
      label: 'Ejemplo: 15 marzo 2024 a 22 marzo 2024',
      values: { startDate: '2024-03-15', endDate: '2024-03-22' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calculan los días de vacaciones?',
      answer: 'Se cuentan todos los días entre las fechas de inicio y fin, excluyendo sábados y domingos.'
    },
    {
      question: '¿Se incluyen los fines de semana?',
      answer: 'No, los sábados y domingos se excluyen del conteo de días laborables.'
    },
    {
      question: '¿Se consideran los días festivos?',
      answer: 'No, esta calculadora solo excluye fines de semana. Los días festivos deben considerarse por separado.'
    },
    {
      question: '¿Puedo usar fechas futuras?',
      answer: 'Sí, puedes calcular días de vacaciones para cualquier período, incluyendo fechas futuras.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Días de Vacaciones - Días Laborables',
            description: 'Calcula días laborables excluyendo fines de semana',
            url: '/calendario/dias-vacaciones/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Días de Vacaciones - Días Laborables"
            description="Calcula días laborables excluyendo fines de semana"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setStartDate(values.startDate as string)
              setEndDate(values.endDate as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Calculadora de Días de Vacaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fecha de Inicio
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fecha de Fin
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Plane className="h-4 w-4 mr-2" />
                  Calcular Días de Vacaciones
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
                      <CardTitle className="text-lg">Resultado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.workingDays}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          días laborables
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {results.workingDays}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Días Laborables
                          </div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            {results.weekendDays}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Fines de Semana
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {results.totalDays}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total de Días
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Detalles del Período:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Fecha de inicio:</span>
                            <span className="font-medium">{results.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Día de inicio:</span>
                            <span className="font-medium">{results.breakdown.startDayOfWeek}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fecha de fin:</span>
                            <span className="font-medium">{results.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Día de fin:</span>
                            <span className="font-medium">{results.breakdown.endDayOfWeek}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total de días:</span>
                            <span className="font-medium">{results.totalDays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Días laborables:</span>
                            <span className="font-medium text-green-600">{results.workingDays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fines de semana:</span>
                            <span className="font-medium text-orange-600">{results.weekendDays}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2 text-blue-800">💡 Información Útil:</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>• Los días laborables excluyen sábados y domingos</p>
                          <p>• Esta calculadora no considera días festivos</p>
                          <p>• Para períodos largos, considera días festivos adicionales</p>
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
    </div>
  )
}
