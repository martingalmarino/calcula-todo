"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Plus, AlertCircle, Calculator } from 'lucide-react'
import { addSubtractDays, type DateOperationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'

export default function SomarSubtrairDiasClientPT() {
  const [date, setDate] = useState('')
  const [days, setDays] = useState('')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [results, setResults] = useState<DateOperationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!date || !days) {
      setError('Por favor, insira a data e o número de dias')
      return
    }

    const daysNumber = parseInt(days)
    if (isNaN(daysNumber) || daysNumber < 0) {
      setError('Por favor, insira um número válido de dias')
      return
    }

    try {
      const result = addSubtractDays(date, daysNumber, operation)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a data')
    }
  }

  const breadcrumbs = getBreadcrumbsPT('/pt/calendario/somar-e-subtrair-dias')

  const examples = [
    {
      label: 'Exemplo: 1 janeiro 2024 + 30 dias',
      values: { date: '2024-01-01', days: '30', operation: 'add' }
    },
    {
      label: 'Exemplo: 15 março 2024 - 7 dias',
      values: { date: '2024-03-15', days: '7', operation: 'subtract' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a calculadora de somar/subtrair dias?',
      answer: 'A calculadora adiciona ou subtrai um número específico de dias de uma data, mostrando a data resultante e o dia da semana.'
    },
    {
      question: 'Posso usar qualquer data?',
      answer: 'Sim, você pode usar qualquer data válida, passada ou futura.'
    },
    {
      question: 'A calculadora considera anos bissextos?',
      answer: 'Sim, a calculadora considera automaticamente anos bissextos para cálculos precisos.'
    },
    {
      question: 'Posso subtrair mais dias do que existem no mês?',
      answer: 'Sim, a calculadora ajusta automaticamente para o mês anterior quando necessário.'
    }
  ]

  const relatedLinks = [
    { href: '/pt/calendario/calculadora-idade', label: 'Calculadora de Idade' },
    { href: '/pt/calendario/dias-entre-datas', label: 'Dias entre Datas' },
    { href: '/pt/calendario/dias-ferias', label: 'Dias de Férias' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Somar e Subtrair Dias',
            description: 'Soma ou subtrai dias a uma data específica, mostrando o resultado e o dia da semana',
            url: '/pt/calendario/somar-e-subtrair-dias',
            category: 'calendario'
          }))
        }}
      />
      
      <Container>
        <div className="py-8">
          <BreadcrumbsPT items={breadcrumbs} />
          
          <CalculatorLayout
            title="Somar e Subtrair Dias"
            description="Soma ou subtrai dias a uma data específica, mostrando o resultado e o dia da semana"
            examples={examples}
            onExampleClick={(values) => {
              if (values.date) setDate(values.date as string)
              if (values.days) setDays(values.days as string)
              if (values.operation) setOperation(values.operation as 'add' | 'subtract')
            }}
            relatedLinks={relatedLinks}
          >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base font-medium">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="min-h-[48px] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="days" className="text-base font-medium">Número de Dias</Label>
                <Input
                  id="days"
                  type="number"
                  min="0"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="Ex: 30"
                  className="min-h-[48px] text-base"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="operation" className="text-base font-medium">Operação</Label>
              <Select value={operation} onValueChange={(value: 'add' | 'subtract') => setOperation(value)}>
                <SelectTrigger className="min-h-[48px] text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Somar Dias (+)</SelectItem>
                  <SelectItem value="subtract">Subtrair Dias (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-6">
              <Button onClick={handleCalculate} className="calculator-button w-full min-h-[48px] text-base font-medium">
                <Calculator className="h-5 w-5" />
                Calcular Data
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
                    <Plus className="h-5 w-5" />
                    Resultado do Cálculo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{results.originalDate}</div>
                      <div className="text-sm text-gray-600">Data Original</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{results.resultDate}</div>
                      <div className="text-sm text-gray-600">Data Resultante</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{results.dayOfWeek}</div>
                    <div className="text-sm text-gray-600">Dia da Semana</div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Detalhes do Cálculo:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Data Original:</strong> {results.originalDate}</li>
                      <li><strong>Dia da Semana (Original):</strong> {results.breakdown.originalDayOfWeek}</li>
                      <li><strong>Operação:</strong> {results.operation === 'add' ? 'Somar' : 'Subtrair'} {results.days} dias</li>
                      <li><strong>Dias Adicionados:</strong> {results.breakdown.daysAdded}</li>
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
