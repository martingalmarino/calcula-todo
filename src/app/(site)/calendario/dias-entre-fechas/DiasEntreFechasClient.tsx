"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar, AlertCircle } from 'lucide-react'
import { calculateDaysBetween, type DaysBetweenResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function DiasEntreFechasClient() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<DaysBetweenResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Por favor, selecciona ambas fechas')
      return
    }

    try {
      const result = calculateDaysBetween(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular los días')
    }
  }

  const breadcrumbs = getBreadcrumbs('/calendario/dias-entre-fechas')

  const examples = [
    {
      label: 'Ejemplo: 1 enero 2024 a 31 diciembre 2024',
      values: { startDate: '2024-01-01', endDate: '2024-12-31' }
    },
    {
      label: 'Ejemplo: 1 enero 2023 a 1 enero 2024',
      values: { startDate: '2023-01-01', endDate: '2024-01-01' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calculan los días entre fechas?',
      answer: 'Se calcula la diferencia exacta en milisegundos entre las dos fechas y se convierte a días, semanas, meses y años.'
    },
    {
      question: '¿Se incluyen los años bisiestos?',
      answer: 'Sí, la calculadora considera automáticamente los años bisiestos en el cálculo.'
    },
    {
      question: '¿Puedo usar fechas futuras?',
      answer: 'Sí, puedes calcular la diferencia entre cualquier par de fechas, incluyendo fechas futuras.'
    },
    {
      question: '¿Qué formato de fecha debo usar?',
      answer: 'Usa el formato YYYY-MM-DD (año-mes-día) que es el estándar internacional.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Días entre Fechas - Contador de Días',
            description: 'Calcula la diferencia exacta en días, semanas, meses y años entre dos fechas',
            url: '/calendario/dias-entre-fechas/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Días entre Fechas - Contador de Días"
            description="Calcula la diferencia exacta en días, semanas, meses y años entre dos fechas"
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
                  <Calendar className="h-5 w-5" />
                  Calculadora de Días entre Fechas
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
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calcular Diferencia
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
                          {results.totalDays}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          días de diferencia
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {results.years}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Años
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600 mb-1">
                            {results.months}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Meses
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600 mb-1">
                            {results.weeks}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Semanas
                          </div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="text-xl font-bold text-orange-600 mb-1">
                            {results.days}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Días
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Detalles del Cálculo:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Fecha de inicio:</span>
                            <span className="font-medium">{results.breakdown.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fecha de fin:</span>
                            <span className="font-medium">{results.breakdown.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total de días:</span>
                            <span className="font-medium">{results.totalDays}</span>
                          </div>
                          {results.breakdown.isLeapYear && (
                            <div className="flex justify-between text-blue-600">
                              <span>Incluye año bisiesto:</span>
                              <span className="font-medium">Sí</span>
                            </div>
                          )}
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
