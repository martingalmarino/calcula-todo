"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, AlertCircle } from 'lucide-react'
import { calculateBodyFat, type BodyFatResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function GrasaCorporalClient() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [results, setResults] = useState<BodyFatResult | null>(null)
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

      const result = calculateBodyFat(weightNum, heightNum, ageNum, gender)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular el porcentaje de grasa corporal')
    }
  }

  const breadcrumbs = getBreadcrumbs('/salud/grasa-corporal')

  const examples = [
    {
      label: 'Ejemplo: Hombre 35 años, 80kg, 180cm',
      values: { weight: '80', height: '180', age: '35', gender: 'male' }
    },
    {
      label: 'Ejemplo: Mujer 28 años, 65kg, 170cm',
      values: { weight: '65', height: '170', age: '28', gender: 'female' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el porcentaje de grasa corporal?',
      answer: 'Es la proporción de grasa en tu cuerpo en relación al peso total. Es un indicador más preciso que el IMC para evaluar la composición corporal.'
    },
    {
      question: '¿Cómo se calcula el porcentaje de grasa corporal?',
      answer: 'Usamos la fórmula de Deurenberg que considera el IMC, la edad y el sexo para estimar el porcentaje de grasa corporal.'
    },
    {
      question: '¿Cuáles son los rangos normales?',
      answer: 'Hombres: Atlético < 6%, Bueno 6-14%, Aceptable 14-18%, Sobrepeso 18-25%, Obesidad > 25%. Mujeres: Atlético < 16%, Bueno 16-20%, Aceptable 20-25%, Sobrepeso 25-32%, Obesidad > 32%.'
    },
    {
      question: '¿Es más preciso que el IMC?',
      answer: 'Sí, el porcentaje de grasa corporal considera la composición corporal, mientras que el IMC solo relaciona peso y altura.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Porcentaje de Grasa Corporal',
            description: 'Calcula tu porcentaje de grasa corporal usando la fórmula de Deurenberg',
            url: '/salud/grasa-corporal/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Porcentaje de Grasa Corporal"
            description="Calcula tu porcentaje de grasa corporal usando la fórmula de Deurenberg"
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
                  <Heart className="h-5 w-5" />
                  Calculadora de Grasa Corporal
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
                  <Heart className="h-4 w-4 mr-2" />
                  Calcular Grasa Corporal
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
                          {results.bodyFat}%
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {results.category}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {results.description}
                        </p>
                        
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
