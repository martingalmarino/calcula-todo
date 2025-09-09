"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GraduationCap, AlertCircle } from 'lucide-react'
import { convertToGradeScale, type GradeScaleResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function EscalaNotasClient() {
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('100')
  const [results, setResults] = useState<GradeScaleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!score) {
      setError('Por favor, ingresa tu puntuación')
      return
    }

    try {
      const scoreNum = parseFloat(score)
      const maxScoreNum = parseFloat(maxScore)
      
      if (isNaN(scoreNum) || isNaN(maxScoreNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      const result = convertToGradeScale(scoreNum, maxScoreNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al convertir la puntuación')
    }
  }

  const breadcrumbs = getBreadcrumbs('/otras/escala-notas')

  const examples = [
    {
      label: 'Ejemplo: 85 puntos de 100',
      values: { score: '85', maxScore: '100' }
    },
    {
      label: 'Ejemplo: 18 puntos de 20',
      values: { score: '18', maxScore: '20' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo funciona la escala de notas?',
      answer: 'Convierte puntuaciones numéricas a letras: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (<60%).'
    },
    {
      question: '¿Puedo cambiar la puntuación máxima?',
      answer: 'Sí, puedes ajustar la puntuación máxima según tu sistema de evaluación (100, 20, 10, etc.).'
    },
    {
      question: '¿Qué significa cada letra?',
      answer: 'A: Excelente, B: Bueno, C: Satisfactorio, D: Aprobado, F: Reprobado.'
    },
    {
      question: '¿Es la escala estándar?',
      answer: 'Esta es una escala común, pero algunos sistemas educativos pueden usar diferentes rangos.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Escala de Notas - Conversión A B C D F',
            description: 'Convierte puntuaciones numéricas a escala de letras A, B, C, D, F',
            url: '/otras/escala-notas/',
            category: 'Educación'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Escala de Notas - Conversión A B C D F"
            description="Convierte puntuaciones numéricas a escala de letras A, B, C, D, F"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setScore(values.score as string)
              setMaxScore(values.maxScore as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Calculadora de Escala de Notas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tu Puntuación
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 85"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Puntuación Máxima
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 100"
                      value={maxScore}
                      onChange={(e) => setMaxScore(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Convertir a Escala
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
                          {results.grade}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          {results.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {results.percentage}% de la puntuación máxima
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Escala de Calificaciones:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">A:</span>
                            <span>90-100% (Excelente)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">B:</span>
                            <span>80-89% (Bueno)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">C:</span>
                            <span>70-79% (Satisfactorio)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">D:</span>
                            <span>60-69% (Aprobado)</span>
                          </div>
                          <div className="flex justify-between col-span-2">
                            <span className="font-medium">F:</span>
                            <span>&lt;60% (Reprobado)</span>
                          </div>
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
