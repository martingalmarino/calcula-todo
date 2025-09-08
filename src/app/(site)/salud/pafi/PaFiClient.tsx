"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Zap, AlertCircle } from 'lucide-react'
import { calculatePaFi, type PaFiResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function PaFiClient() {
  const [systolicBP, setSystolicBP] = useState('')
  const [diastolicBP, setDiastolicBP] = useState('')
  const [heartRate, setHeartRate] = useState('')
  const [results, setResults] = useState<PaFiResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!systolicBP || !diastolicBP || !heartRate) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const systolicNum = parseFloat(systolicBP)
      const diastolicNum = parseFloat(diastolicBP)
      const heartRateNum = parseFloat(heartRate)
      
      if (isNaN(systolicNum) || isNaN(diastolicNum) || isNaN(heartRateNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      const result = calculatePaFi(systolicNum, diastolicNum, heartRateNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular el índice PaFi')
    }
  }

  const breadcrumbs = getBreadcrumbs('/salud/pafi')

  const examples = [
    {
      label: 'Ejemplo: PA 120/80, FC 70',
      values: { systolicBP: '120', diastolicBP: '80', heartRate: '70' }
    },
    {
      label: 'Ejemplo: PA 140/90, FC 85',
      values: { systolicBP: '140', diastolicBP: '90', heartRate: '85' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el índice PaFi?',
      answer: 'El índice PaFi es la relación entre la presión arterial media y la frecuencia cardíaca. Ayuda a evaluar la función cardiovascular.'
    },
    {
      question: '¿Cómo se calcula el índice PaFi?',
      answer: 'PaFi = Presión Arterial Media / Frecuencia Cardíaca. La PAM se calcula como: (Presión Sistólica + 2 × Presión Diastólica) / 3'
    },
    {
      question: '¿Qué significan los valores del PaFi?',
      answer: 'Bajo (< 0.5): Puede indicar hipotensión o taquicardia. Normal (0.5-1.0): Función cardiovascular normal. Elevado (> 1.0): Puede indicar hipertensión o bradicardia.'
    },
    {
      question: '¿Es una herramienta de diagnóstico?',
      answer: 'No, es una herramienta de evaluación. Siempre consulta con un profesional de la salud para interpretación médica adecuada.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora PaFi - Presión Arterial y Frecuencia Cardíaca',
            description: 'Calcula el índice PaFi para evaluar la relación entre presión arterial y frecuencia cardíaca',
            url: '/salud/pafi/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora PaFi - Presión Arterial y Frecuencia Cardíaca"
            description="Calcula el índice PaFi para evaluar la relación entre presión arterial y frecuencia cardíaca"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setSystolicBP(values.systolicBP as string)
              setDiastolicBP(values.diastolicBP as string)
              setHeartRate(values.heartRate as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Calculadora PaFi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Presión Sistólica (mmHg)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 120"
                      value={systolicBP}
                      onChange={(e) => setSystolicBP(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Presión Diastólica (mmHg)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 80"
                      value={diastolicBP}
                      onChange={(e) => setDiastolicBP(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Frecuencia Cardíaca (lpm)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 70"
                      value={heartRate}
                      onChange={(e) => setHeartRate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Calcular PaFi
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
                          {results.pafi}
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
                          <h4 className="font-medium mb-2">Interpretación:</h4>
                          <p className="text-sm text-muted-foreground">
                            {results.interpretation}
                          </p>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            <strong>Importante:</strong> Esta calculadora es solo para fines informativos. 
                            Siempre consulta con un profesional de la salud para interpretación médica adecuada.
                          </p>
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
