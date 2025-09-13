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
import { Plane, AlertCircle, Calculator } from 'lucide-react'
import { calculateVacationDays, type VacationDaysResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'

export default function DiasFeriasClientPT() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<VacationDaysResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Por favor, selecione ambas as datas')
      return
    }

    try {
      const result = calculateVacationDays(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular os dias de férias')
    }
  }

  const breadcrumbs = getBreadcrumbsPT('/pt/calendario/dias-ferias')

  const examples = [
    {
      label: 'Exemplo: 1 janeiro 2024 a 7 janeiro 2024',
      values: { startDate: '2024-01-01', endDate: '2024-01-07' }
    },
    {
      label: 'Exemplo: 15 março 2024 a 22 março 2024',
      values: { startDate: '2024-03-15', endDate: '2024-03-22' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a calculadora de dias de férias?',
      answer: 'A calculadora mostra o total de dias entre duas datas, separando dias úteis (segunda a sexta) e fins de semana (sábado e domingo).'
    },
    {
      question: 'A calculadora considera feriados?',
      answer: 'Não, a calculadora considera apenas fins de semana. Feriados específicos devem ser considerados separadamente.'
    },
    {
      question: 'Posso usar qualquer período?',
      answer: 'Sim, você pode calcular dias de férias para qualquer período, passado ou futuro.'
    },
    {
      question: 'Como interpretar os resultados?',
      answer: 'O resultado mostra o total de dias, dias úteis e fins de semana no período selecionado.'
    }
  ]

  const relatedLinks = [
    { href: '/pt/calendario/calculadora-idade', label: 'Calculadora de Idade' },
    { href: '/pt/calendario/dias-entre-datas', label: 'Dias entre Datas' },
    { href: '/pt/calendario/somar-e-subtrair-dias', label: 'Somar e Subtrair Dias' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Dias de Férias',
            description: 'Calcula os dias de férias entre duas datas, separando dias úteis e fins de semana',
            url: '/pt/calendario/dias-ferias',
            category: 'calendario'
          }))
        }}
      />
      
      <Container>
        <div className="py-8">
          <BreadcrumbsPT items={breadcrumbs} />
          
          <CalculatorLayout
            title="Dias de Férias"
            description="Calcula os dias de férias entre duas datas, separando dias úteis e fins de semana"
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
                <Label htmlFor="startDate" className="text-base font-medium">Data de Início das Férias</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="min-h-[48px] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-base font-medium">Data de Fim das Férias</Label>
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
                Calcular Dias de Férias
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
                    <Plane className="h-5 w-5" />
                    Resultado dos Dias de Férias
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.totalDays}</div>
                      <div className="text-sm text-gray-600">Total de Dias</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{results.workingDays}</div>
                      <div className="text-sm text-gray-600">Dias Úteis</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.weekendDays}</div>
                      <div className="text-sm text-gray-600">Fins de Semana</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Detalhes do Período:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Data de Início:</strong> {results.startDate}</li>
                      <li><strong>Data de Fim:</strong> {results.endDate}</li>
                      <li><strong>Dia da Semana (Início):</strong> {results.breakdown.startDayOfWeek}</li>
                      <li><strong>Dia da Semana (Fim):</strong> {results.breakdown.endDayOfWeek}</li>
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
