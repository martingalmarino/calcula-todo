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
import { Calendar, AlertCircle, Calculator } from 'lucide-react'
import { calculateDaysBetween, type DaysBetweenResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function DiasEntreDatasClientPT() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<DaysBetweenResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Por favor, selecione ambas as datas')
      return
    }

    try {
      const result = calculateDaysBetween(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a diferença')
    }
  }

  const breadcrumbs = getBreadcrumbs('/pt/calendario/dias-entre-datas')

  const examples = [
    {
      label: 'Exemplo: 1 janeiro 2020 a 1 janeiro 2021',
      values: { startDate: '2020-01-01', endDate: '2021-01-01' }
    },
    {
      label: 'Exemplo: 15 março 2023 a 15 junho 2023',
      values: { startDate: '2023-03-15', endDate: '2023-06-15' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a calculadora de dias entre datas?',
      answer: 'A calculadora calcula a diferença exata em dias, semanas, meses e anos entre duas datas específicas que você inserir.'
    },
    {
      question: 'Posso usar qualquer formato de data?',
      answer: 'Sim, use o formato DD/MM/AAAA ou selecione as datas usando o seletor de data.'
    },
    {
      question: 'A calculadora considera anos bissextos?',
      answer: 'Sim, a calculadora considera automaticamente anos bissextos para cálculos precisos.'
    },
    {
      question: 'Posso calcular dias passados?',
      answer: 'Sim, você pode calcular a diferença entre qualquer duas datas, passadas ou futuras.'
    }
  ]

  const relatedLinks = [
    { href: '/pt/calendario/calculadora-idade', label: 'Calculadora de Idade' },
    { href: '/pt/calendario/somar-e-subtrair-dias', label: 'Somar e Subtrair Dias' },
    { href: '/pt/calendario/dias-ferias', label: 'Dias de Férias' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Dias entre Datas',
            description: 'Calcula a diferença exata em dias, semanas, meses e anos entre duas datas específicas',
            url: '/pt/calendario/dias-entre-datas',
            category: 'calendario'
          }))
        }}
      />
      
      <Container>
        <div className="py-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <CalculatorLayout
            title="Dias entre Datas"
            description="Calcula a diferença exata em dias, semanas, meses e anos entre duas datas específicas"
            examples={examples}
            onExampleClick={(values) => {
              if (values.startDate) setStartDate(values.startDate as string)
              if (values.endDate) setEndDate(values.endDate as string)
            }}
            relatedLinks={relatedLinks}
          >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-base font-medium">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="min-h-[48px] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-base font-medium">Data de Fim</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="min-h-[48px] text-base"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button onClick={handleCalculate} className="calculator-button w-full min-h-[48px] text-base font-medium">
                <Calculator className="h-5 w-5" />
                Calcular Diferença
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
                    <Calendar className="h-5 w-5" />
                    Resultado da Diferença
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
                      <div className="text-2xl font-bold text-purple-600">{results.weeks}</div>
                      <div className="text-sm text-gray-600">Semanas</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{results.totalDays.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Dias</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Detalhes do Cálculo:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Data de Início:</strong> {results.breakdown.startDate}</li>
                      <li><strong>Data de Fim:</strong> {results.breakdown.endDate}</li>
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
