"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Scale, AlertCircle } from 'lucide-react'
import { calculateIMC, type IMCResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function IMCClient() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [results, setResults] = useState<IMCResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !height) {
      setError('Por favor, ingresa tu peso y altura')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      
      if (isNaN(weightNum) || isNaN(heightNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      const result = calculateIMC(weightNum, heightNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular el IMC')
    }
  }

  const breadcrumbs = getBreadcrumbs('/salud/imc')

  const examples = [
    {
      label: 'Ejemplo: Persona de 70kg y 175cm',
      values: { weight: '70', height: '175' }
    },
    {
      label: 'Ejemplo: Persona de 60kg y 165cm',
      values: { weight: '60', height: '165' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el IMC?',
      answer: 'El Índice de Masa Corporal (IMC) es una medida que relaciona el peso con la altura para evaluar si una persona tiene un peso saludable.'
    },
    {
      question: '¿Cómo se calcula el IMC?',
      answer: 'El IMC se calcula dividiendo el peso (en kg) entre la altura al cuadrado (en metros): IMC = peso / (altura)²'
    },
    {
      question: '¿Cuáles son las categorías del IMC?',
      answer: 'Bajo peso: < 18.5, Normal: 18.5-24.9, Sobrepeso: 25-29.9, Obesidad: ≥ 30'
    },
    {
      question: '¿El IMC es preciso para todos?',
      answer: 'El IMC es una herramienta útil pero no considera la composición corporal. Atletas con mucha masa muscular pueden tener IMC elevado sin ser obesos.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de IMC - Índice de Masa Corporal',
            description: 'Calcula tu Índice de Masa Corporal y descubre tu categoría de peso ideal',
            url: '/salud/imc/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de IMC - Índice de Masa Corporal"
            description="Calcula tu Índice de Masa Corporal y descubre tu categoría de peso ideal"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setWeight(values.weight as string)
              setHeight(values.height as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Calculadora de IMC
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
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Calcular IMC
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
                          {results.imc}
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {results.category}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {results.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {results.recommendation}
                        </p>
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
