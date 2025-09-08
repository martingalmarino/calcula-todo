"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Activity, AlertCircle } from 'lucide-react'
import { calculateTMB, type TMBResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function TMBClient() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [results, setResults] = useState<TMBResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !height || !age) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      const ageNum = parseInt(age)
      
      if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      const result = calculateTMB(weightNum, heightNum, ageNum, gender)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la TMB')
    }
  }

  const breadcrumbs = getBreadcrumbs('/salud/tmb')

  const examples = [
    {
      label: 'Ejemplo: Hombre 30 años, 75kg, 180cm',
      values: { weight: '75', height: '180', age: '30', gender: 'male' }
    },
    {
      label: 'Ejemplo: Mujer 25 años, 60kg, 165cm',
      values: { weight: '60', height: '165', age: '25', gender: 'female' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la TMB?',
      answer: 'La Tasa Metabólica Basal (TMB) es la cantidad de calorías que tu cuerpo quema en reposo para mantener las funciones vitales básicas.'
    },
    {
      question: '¿Cómo se calcula la TMB?',
      answer: 'Usamos la fórmula de Mifflin-St Jeor: Hombres: TMB = (10 × peso) + (6.25 × altura) - (5 × edad) + 5. Mujeres: TMB = (10 × peso) + (6.25 × altura) - (5 × edad) - 161'
    },
    {
      question: '¿Para qué sirve conocer mi TMB?',
      answer: 'Te ayuda a planificar tu dieta y ejercicio. Para perder peso necesitas consumir menos calorías que tu TMB + actividad física.'
    },
    {
      question: '¿La TMB cambia con la edad?',
      answer: 'Sí, la TMB disminuye con la edad debido a la pérdida de masa muscular. Por eso es importante mantener actividad física regular.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de TMB - Tasa Metabólica Basal',
            description: 'Calcula tu Tasa Metabólica Basal y descubre cuántas calorías quemas en reposo',
            url: '/salud/tmb/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de TMB - Tasa Metabólica Basal"
            description="Calcula tu Tasa Metabólica Basal y descubre cuántas calorías quemas en reposo"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setWeight(values.weight as string)
              setHeight(values.height as string)
              setAge(values.age as string)
              setGender(values.gender as 'male' | 'female')
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Calculadora de TMB
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Altura (cm)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sexo
                    </label>
                    <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Hombre</SelectItem>
                        <SelectItem value="female">Mujer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Calcular TMB
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
                        <div className="text-3xl font-bold text-red-600 mb-2">
                          {results.tmb} kcal/día
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {results.method}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Fórmula utilizada:</h4>
                          <p className="text-sm text-muted-foreground font-mono bg-gray-100 p-2 rounded">
                            {results.explanation}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Recomendaciones:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {results.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-red-600 mt-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
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
