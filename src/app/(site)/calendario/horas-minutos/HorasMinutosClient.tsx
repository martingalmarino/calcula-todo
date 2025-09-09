"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Plus, Minus, AlertCircle } from 'lucide-react'
import { calculateTimeOperation, type TimeCalculationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function HorasMinutosClient() {
  const [time1, setTime1] = useState('')
  const [time2, setTime2] = useState('')
  const [addResult, setAddResult] = useState<TimeCalculationResult | null>(null)
  const [subtractResult, setSubtractResult] = useState<TimeCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddTime = () => {
    setError(null)
    
    if (!time1 || !time2) {
      setError('Por favor, completa ambos campos de tiempo')
      return
    }

    try {
      const result = calculateTimeOperation(time1, time2, 'add')
      setAddResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al sumar los tiempos')
    }
  }

  const handleSubtractTime = () => {
    setError(null)
    
    if (!time1 || !time2) {
      setError('Por favor, completa ambos campos de tiempo')
      return
    }

    try {
      const result = calculateTimeOperation(time1, time2, 'subtract')
      setSubtractResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restar los tiempos')
    }
  }

  const breadcrumbs = getBreadcrumbs('/calendario/horas-minutos')

  const examples = [
    {
      label: 'Ejemplo: 08:30 + 02:45',
      values: { time1: '08:30', time2: '02:45' }
    },
    {
      label: 'Ejemplo: 14:20 - 01:30',
      values: { time1: '14:20', time2: '01:30' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo funciona la suma de tiempo?',
      answer: 'Se suman las horas y minutos, y si los minutos exceden 60, se convierten automáticamente en horas.'
    },
    {
      question: '¿Cómo funciona la resta de tiempo?',
      answer: 'Se restan las horas y minutos. Si el resultado es negativo, se ajusta a un formato de 24 horas.'
    },
    {
      question: '¿Qué formato de hora debo usar?',
      answer: 'Usa el formato HH:MM (24 horas), por ejemplo: 14:30 para las 2:30 PM.'
    },
    {
      question: '¿Se puede exceder las 24 horas?',
      answer: 'No, el resultado se normaliza a un formato de 24 horas (0:00 a 23:59).'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Horas y Minutos - Suma y Resta de Tiempo',
            description: 'Suma y resta horas y minutos con precisión',
            url: '/calendario/horas-minutos/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Horas y Minutos - Suma y Resta de Tiempo"
            description="Suma y resta horas y minutos con precisión"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setTime1(values.time1 as string)
              setTime2(values.time2 as string)
            }}
          >
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Sumar Tiempo</TabsTrigger>
                <TabsTrigger value="subtract">Restar Tiempo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Sumar Horas y Minutos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tiempo 1 (HH:MM)
                        </label>
                        <Input
                          type="time"
                          value={time1}
                          onChange={(e) => setTime1(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tiempo 2 (HH:MM)
                        </label>
                        <Input
                          type="time"
                          value={time2}
                          onChange={(e) => setTime2(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAddTime} 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Sumar Tiempos
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
                            <div className="text-4xl font-bold text-red-600 mb-2">
                              {String(addResult.hours).padStart(2, '0')}:{String(addResult.minutes).padStart(2, '0')}
                            </div>
                            <div className="text-lg text-muted-foreground">
                              {addResult.totalHours} horas totales
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="text-xl font-bold text-blue-600 mb-1">
                                {addResult.hours}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Horas
                              </div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <div className="text-xl font-bold text-green-600 mb-1">
                                {addResult.minutes}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Minutos
                              </div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <div className="text-xl font-bold text-purple-600 mb-1">
                                {addResult.totalMinutes}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Minutos Totales
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Detalles del Cálculo:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Tiempo 1:</span>
                                <span className="font-medium">{addResult.breakdown.time1}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tiempo 2:</span>
                                <span className="font-medium">{addResult.breakdown.time2}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Operación:</span>
                                <span className="font-medium">{addResult.breakdown.operation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Resultado:</span>
                                <span className="font-medium">{String(addResult.hours).padStart(2, '0')}:{String(addResult.minutes).padStart(2, '0')}</span>
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
                      Restar Horas y Minutos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tiempo 1 (HH:MM)
                        </label>
                        <Input
                          type="time"
                          value={time1}
                          onChange={(e) => setTime1(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tiempo 2 (HH:MM)
                        </label>
                        <Input
                          type="time"
                          value={time2}
                          onChange={(e) => setTime2(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSubtractTime} 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Restar Tiempos
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
                            <div className="text-4xl font-bold text-red-600 mb-2">
                              {String(subtractResult.hours).padStart(2, '0')}:{String(subtractResult.minutes).padStart(2, '0')}
                            </div>
                            <div className="text-lg text-muted-foreground">
                              {subtractResult.totalHours} horas totales
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="text-xl font-bold text-blue-600 mb-1">
                                {subtractResult.hours}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Horas
                              </div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <div className="text-xl font-bold text-green-600 mb-1">
                                {subtractResult.minutes}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Minutos
                              </div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <div className="text-xl font-bold text-purple-600 mb-1">
                                {subtractResult.totalMinutes}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Minutos Totales
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Detalles del Cálculo:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Tiempo 1:</span>
                                <span className="font-medium">{subtractResult.breakdown.time1}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tiempo 2:</span>
                                <span className="font-medium">{subtractResult.breakdown.time2}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Operación:</span>
                                <span className="font-medium">{subtractResult.breakdown.operation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Resultado:</span>
                                <span className="font-medium">{String(subtractResult.hours).padStart(2, '0')}:{String(subtractResult.minutes).padStart(2, '0')}</span>
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
