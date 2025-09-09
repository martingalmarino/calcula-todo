"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Minus, AlertCircle } from 'lucide-react'
import { addSubtractDays, type DateOperationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function SumarRestarDiasClient() {
  const [date, setDate] = useState('')
  const [days, setDays] = useState('')
  const [addResult, setAddResult] = useState<DateOperationResult | null>(null)
  const [subtractResult, setSubtractResult] = useState<DateOperationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddDays = () => {
    setError(null)
    
    if (!date || !days) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const daysNum = parseInt(days)
      if (isNaN(daysNum) || daysNum < 0) {
        setError('Por favor, ingresa un número válido de días')
        return
      }

      const result = addSubtractDays(date, daysNum, 'add')
      setAddResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al sumar los días')
    }
  }

  const handleSubtractDays = () => {
    setError(null)
    
    if (!date || !days) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const daysNum = parseInt(days)
      if (isNaN(daysNum) || daysNum < 0) {
        setError('Por favor, ingresa un número válido de días')
        return
      }

      const result = addSubtractDays(date, daysNum, 'subtract')
      setSubtractResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restar los días')
    }
  }

  const breadcrumbs = getBreadcrumbs('/calendario/sumar-restar-dias')

  const examples = [
    {
      label: 'Ejemplo: 1 enero 2024 + 30 días',
      values: { date: '2024-01-01', days: '30' }
    },
    {
      label: 'Ejemplo: 15 marzo 2024 - 7 días',
      values: { date: '2024-03-15', days: '7' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo funciona la suma de días?',
      answer: 'Se añaden los días especificados a la fecha original, considerando automáticamente los meses y años.'
    },
    {
      question: '¿Cómo funciona la resta de días?',
      answer: 'Se restan los días especificados de la fecha original, retrocediendo en el calendario según sea necesario.'
    },
    {
      question: '¿Se consideran los años bisiestos?',
      answer: 'Sí, la calculadora considera automáticamente los años bisiestos en el cálculo.'
    },
    {
      question: '¿Puedo usar números negativos?',
      answer: 'No, solo se permiten números positivos. Usa la pestaña correspondiente para sumar o restar.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Sumar y Restar Días a una Fecha - Calculadora de Fechas',
            description: 'Suma o resta días a una fecha específica y obtén el resultado exacto',
            url: '/calendario/sumar-restar-dias/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Sumar y Restar Días a una Fecha - Calculadora de Fechas"
            description="Suma o resta días a una fecha específica y obtén el resultado exacto"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setDate(values.date as string)
              setDays(values.days as string)
            }}
          >
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Sumar Días</TabsTrigger>
                <TabsTrigger value="subtract">Restar Días</TabsTrigger>
              </TabsList>
              
              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Sumar Días a una Fecha
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Fecha Original
                        </label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Días a Sumar
                        </label>
                        <Input
                          type="number"
                          placeholder="Ej: 30"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          className="w-full"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAddDays} 
                      className="w-full calculator-button"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Sumar Días
                    </Button>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    {addResult && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Resultado</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-2">
                              {addResult.resultDate}
                            </div>
                            <div className="text-lg text-muted-foreground">
                              {addResult.dayOfWeek}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Detalles del Cálculo:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Fecha original:</span>
                                <span className="font-medium">{addResult.originalDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Día de la semana original:</span>
                                <span className="font-medium">{addResult.breakdown.originalDayOfWeek}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Días añadidos:</span>
                                <span className="font-medium">+{addResult.days}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Nueva fecha:</span>
                                <span className="font-medium">{addResult.resultDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Nuevo día de la semana:</span>
                                <span className="font-medium">{addResult.dayOfWeek}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subtract">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Minus className="h-5 w-5" />
                      Restar Días a una Fecha
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Fecha Original
                        </label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Días a Restar
                        </label>
                        <Input
                          type="number"
                          placeholder="Ej: 7"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          className="w-full"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSubtractDays} 
                      className="w-full calculator-button"
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Restar Días
                    </Button>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    {subtractResult && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Resultado</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-2">
                              {subtractResult.resultDate}
                            </div>
                            <div className="text-lg text-muted-foreground">
                              {subtractResult.dayOfWeek}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Detalles del Cálculo:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Fecha original:</span>
                                <span className="font-medium">{subtractResult.originalDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Día de la semana original:</span>
                                <span className="font-medium">{subtractResult.breakdown.originalDayOfWeek}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Días restados:</span>
                                <span className="font-medium">-{subtractResult.days}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Nueva fecha:</span>
                                <span className="font-medium">{subtractResult.resultDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Nuevo día de la semana:</span>
                                <span className="font-medium">{subtractResult.dayOfWeek}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
