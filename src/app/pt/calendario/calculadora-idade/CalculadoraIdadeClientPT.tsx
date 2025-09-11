"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { User, AlertCircle, Calculator } from 'lucide-react'
import { calculateAge, type AgeResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function CalculadoraIdadeClientPT() {
  const [birthDate, setBirthDate] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [results, setResults] = useState<AgeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!birthDate) {
      setError('Por favor, selecione sua data de nascimento')
      return
    }

    try {
      const result = calculateAge(birthDate, currentDate || undefined)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a idade')
    }
  }

  const breadcrumbs = getBreadcrumbs('/pt/calendario/calculadora-idade')

  const examples = [
    {
      label: 'Exemplo: Nascido em 1 janeiro 1990',
      values: { birthDate: '1990-01-01' }
    },
    {
      label: 'Exemplo: Nascido em 15 março 1985',
      values: { birthDate: '1985-03-15' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a calculadora de idade?',
      answer: 'A calculadora de idade calcula sua idade exata em anos, meses e dias desde sua data de nascimento até a data atual ou uma data específica que você escolher.'
    },
    {
      question: 'Posso calcular minha idade em uma data específica?',
      answer: 'Sim! Você pode inserir uma data específica no campo "Data Atual" para calcular sua idade nessa data exata.'
    },
    {
      question: 'A calculadora considera anos bissextos?',
      answer: 'Sim, a calculadora considera automaticamente anos bissextos para cálculos precisos.'
    },
    {
      question: 'Posso usar datas futuras?',
      answer: 'Não, a data de nascimento deve ser anterior à data atual para cálculos válidos.'
    }
  ]

  const relatedLinks = [
    { href: '/pt/calendario/dias-entre-datas', label: 'Dias entre Datas' },
    { href: '/pt/calendario/somar-e-subtrair-dias', label: 'Somar e Subtrair Dias' },
    { href: '/pt/calendario/dias-ferias', label: 'Dias de Férias' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Idade',
            description: 'Calcula sua idade exata em anos, meses e dias desde sua data de nascimento',
            url: '/pt/calendario/calculadora-idade',
            category: 'calendario'
          }))
        }}
      />
      
      <Container>
        <div className="py-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <CalculatorLayout
            title="Calculadora de Idade"
            description="Calcula sua idade exata em anos, meses e dias desde sua data de nascimento"
            examples={examples}
            onExampleClick={(values) => {
              if (values.birthDate) setBirthDate(values.birthDate as string)
              if (values.currentDate) setCurrentDate(values.currentDate as string)
            }}
            relatedLinks={relatedLinks}
          >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-base font-medium">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="min-h-[48px] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentDate" className="text-base font-medium">Data Atual (opcional)</Label>
                <Input
                  id="currentDate"
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="min-h-[48px] text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Deixe vazio para usar a data atual
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button onClick={handleCalculate} className="calculator-button w-full min-h-[48px] text-base font-medium">
                <Calculator className="h-5 w-5" />
                Calcular Idade
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Resultado da Idade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.years}</div>
                      <div className="text-sm text-gray-600">Anos</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{results.months}</div>
                      <div className="text-sm text-gray-600">Meses</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.days}</div>
                      <div className="text-sm text-gray-600">Dias</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{results.totalDays.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Dias</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Detalhes do Cálculo:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Data de Nascimento:</strong> {results.breakdown.birthDate}</li>
                      <li><strong>Data Atual:</strong> {results.breakdown.currentDate}</li>
                      <li><strong>Ano Bissexto:</strong> {results.breakdown.isLeapYear ? 'Sim' : 'Não'}</li>
                    </ul>
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
