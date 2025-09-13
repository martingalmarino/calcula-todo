"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GraduationCap, Calculator } from 'lucide-react'
import { convertToGradeScale, type GradeScaleResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function EscalaNotasClientPT() {
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('100')
  const [results, setResults] = useState<GradeScaleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!score) {
      setError('Por favor, digite sua pontuação')
      return
    }

    try {
      const scoreNum = parseFloat(score)
      const maxScoreNum = parseFloat(maxScore)
      
      if (isNaN(scoreNum) || isNaN(maxScoreNum)) {
        setError('Por favor, digite valores numéricos válidos')
        return
      }

      if (scoreNum < 0 || maxScoreNum <= 0) {
        setError('A pontuação deve ser positiva e a pontuação máxima deve ser maior que zero')
        return
      }

      if (scoreNum > maxScoreNum) {
        setError('A pontuação não pode ser maior que a pontuação máxima')
        return
      }

      const result = convertToGradeScale(scoreNum, maxScoreNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao converter a pontuação')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Outras', href: '/pt/outras/' },
    { label: 'Escala de Notas', href: '/pt/outras/escala-notas/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 85 pontos de 100',
      values: { score: '85', maxScore: '100' }
    },
    {
      label: 'Exemplo: 42 pontos de 50',
      values: { score: '42', maxScore: '50' }
    },
    {
      label: 'Exemplo: 18 pontos de 20',
      values: { score: '18', maxScore: '20' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a escala de notas?',
      answer: 'A calculadora converte sua pontuação numérica para uma escala de letras baseada em percentuais: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (0-59%).'
    },
    {
      question: 'Posso usar qualquer pontuação máxima?',
      answer: 'Sim, você pode definir qualquer pontuação máxima (100, 50, 20, etc.). A calculadora ajustará automaticamente os percentuais.'
    },
    {
      question: 'A escala é universal?',
      answer: 'Esta é uma escala comum, mas diferentes instituições podem usar critérios ligeiramente diferentes. Consulte sempre as diretrizes da sua escola ou universidade.'
    },
    {
      question: 'O que significa cada letra?',
      answer: 'A = Excelente (90-100%), B = Bom (80-89%), C = Satisfatório (70-79%), D = Insatisfatório (60-69%), F = Reprovado (0-59%).'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Porcentagens',
      href: '/pt/matematicas/porcentajes/'
    },
    {
      label: 'Calculadora de Frações',
      href: '/pt/matematicas/fracciones/'
    },
    {
      label: 'Outras Calculadoras',
      href: '/pt/outras/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Escala de Notas',
            description: 'Converte pontuações numéricas para escala de notas A, B, C, D, F',
            url: '/pt/outras/escala-notas/',
            category: 'Educação'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Escala de Notas"
            description="Converte pontuações numéricas para escala de notas A, B, C, D, F"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setScore(values.score as string)
              setMaxScore(values.maxScore as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score">Sua Pontuação</Label>
                  <Input
                    id="score"
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Ex: 85"
                  />
                </div>
                <div>
                  <Label htmlFor="maxScore">Pontuação Máxima</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    placeholder="Ex: 100"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Converter para Escala de Notas
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Resultado da Conversão
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Nota</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{results.grade}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Percentual</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{results.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Descrição:</strong> {results.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Pontuação:</strong> {score} de {maxScore} pontos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
