"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User, AlertCircle } from 'lucide-react'
import { calculateAge, type AgeResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function CalculadoraEdadClient() {
  const [birthDate, setBirthDate] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [results, setResults] = useState<AgeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!birthDate) {
      setError('Por favor, selecciona tu fecha de nacimiento')
      return
    }

    try {
      const result = calculateAge(birthDate, currentDate || undefined)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la edad')
    }
  }

  const breadcrumbs = getBreadcrumbs('/calendario/calculadora-edad')

  const examples = [
    {
      label: 'Ejemplo: Nacido el 1 enero 1990',
      values: { birthDate: '1990-01-01' }
    },
    {
      label: 'Ejemplo: Nacido el 15 marzo 1985',
      values: { birthDate: '1985-03-15' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calcula la edad exacta?',
      answer: 'Se calcula la diferencia entre la fecha de nacimiento y la fecha actual, considerando años, meses y días exactos.'
    },
    {
      question: '¿Puedo usar una fecha específica?',
      answer: 'Sí, puedes calcular la edad en cualquier fecha específica, no solo la fecha actual.'
    },
    {
      question: '¿Se consideran los años bisiestos?',
      answer: 'Sí, la calculadora considera automáticamente los años bisiestos en el cálculo.'
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
            name: 'Calculadora de Edad - Calcular Edad Exacta',
            description: 'Calcula tu edad exacta en años, meses y días desde tu fecha de nacimiento',
            url: '/calendario/calculadora-edad/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Edad - Calcular Edad Exacta"
            description="Calcula tu edad exacta en años, meses y días desde tu fecha de nacimiento"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setBirthDate(values.birthDate as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Calculadora de Edad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fecha de Nacimiento *
                    </label>
                    <Input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fecha de Referencia (opcional)
                    </label>
                    <Input
                      type="date"
                      value={currentDate}
                      onChange={(e) => setCurrentDate(e.target.value)}
                      className="w-full"
                      placeholder="Dejar vacío para usar fecha actual"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Deja vacío para calcular con la fecha actual
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <User className="h-4 w-4 mr-2" />
                  Calcular Edad
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
                      <CardTitle className="text-lg">Tu Edad Exacta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.years} años
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {results.months} meses y {results.days} días
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {results.years}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Años
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {results.months}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Meses
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {results.days}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Días
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Información Adicional:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Fecha de nacimiento:</span>
                            <span className="font-medium">{results.breakdown.birthDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fecha de referencia:</span>
                            <span className="font-medium">{results.breakdown.currentDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total de días vividos:</span>
                            <span className="font-medium">{results.totalDays.toLocaleString()}</span>
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
