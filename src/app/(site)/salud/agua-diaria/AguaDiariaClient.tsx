"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Droplets, Scale, Calendar, Activity, AlertCircle } from 'lucide-react'
import { calculateWaterIntake, type WaterIntakeResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AguaDiariaClient() {
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate')
  const [results, setResults] = useState<WaterIntakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !age) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const ageNum = parseInt(age)
      
      if (isNaN(weightNum) || isNaN(ageNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      const result = calculateWaterIntake(weightNum, ageNum, activityLevel)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la ingesta de agua')
    }
  }

  const breadcrumbs = getBreadcrumbs('/salud/agua-diaria')

  const examples = [
    {
      label: 'Ejemplo: 70kg, 30 años, actividad moderada',
      values: { weight: '70', age: '30', activityLevel: 'moderate' }
    },
    {
      label: 'Ejemplo: 60kg, 25 años, actividad alta',
      values: { weight: '60', age: '25', activityLevel: 'high' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calcula la ingesta de agua recomendada?',
      answer: 'Se basa en 35ml por kg de peso corporal, ajustado por edad y nivel de actividad física.'
    },
    {
      question: '¿Qué factores influyen en la necesidad de agua?',
      answer: 'El peso, la edad, el nivel de actividad, el clima, la salud general y el embarazo/lactancia.'
    },
    {
      question: '¿Cuáles son los signos de deshidratación?',
      answer: 'Sed, boca seca, fatiga, mareos, orina oscura y disminución de la frecuencia urinaria.'
    },
    {
      question: '¿Puedo beber demasiada agua?',
      answer: 'Sí, aunque es raro. La intoxicación por agua puede ocurrir con más de 1 litro por hora durante varias horas.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Agua Diaria Recomendada - Hidratación Saludable',
            description: 'Calcula cuánta agua debes beber según tu peso, edad y nivel de actividad',
            url: '/salud/agua-diaria/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Agua Diaria Recomendada - Hidratación Saludable"
            description="Calcula cuánta agua debes beber según tu peso, edad y nivel de actividad"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setWeight(values.weight as string)
              setAge(values.age as string)
              setActivityLevel(values.activityLevel as 'low' | 'moderate' | 'high')
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Calculadora de Agua Diaria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Peso (kg)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Edad (años)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nivel de Actividad
                    </label>
                    <Select value={activityLevel} onValueChange={(value: 'low' | 'moderate' | 'high') => setActivityLevel(value)}>
                      <SelectTrigger className="w-full">
                        <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Selecciona nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baja (sedentario)</SelectItem>
                        <SelectItem value="moderate">Moderada (ejercicio ligero)</SelectItem>
                        <SelectItem value="high">Alta (ejercicio intenso)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Droplets className="h-4 w-4 mr-2" />
                  Calcular Ingesta de Agua
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
                      <CardTitle className="text-lg">Recomendación de Agua Diaria</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.dailyWater} ml
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {results.dailyWater / 1000} litros por día
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {results.glasses}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Vasos (250ml)
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {results.bottles}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Botellas (500ml)
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {results.category}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Nivel de Ingesta
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Recomendaciones:</h4>
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
