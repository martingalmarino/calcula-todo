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
import { Clock, AlertCircle, Calculator } from 'lucide-react'
import { calculateTimeOperation, type TimeCalculationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'

export default function HorasMinutosClientPT() {
  const [time1, setTime1] = useState('')
  const [time2, setTime2] = useState('')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [results, setResults] = useState<TimeCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!time1 || !time2) {
      setError('Por favor, insira ambos os horários')
      return
    }

    try {
      const result = calculateTimeOperation(time1, time2, operation)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular o tempo')
    }
  }

  const breadcrumbs = getBreadcrumbsPT('/pt/calendario/horas-e-minutos')

  const examples = [
    {
      label: 'Exemplo: 08:30 + 02:15',
      values: { time1: '08:30', time2: '02:15', operation: 'add' }
    },
    {
      label: 'Exemplo: 14:45 - 01:30',
      values: { time1: '14:45', time2: '01:30', operation: 'subtract' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a calculadora de horas e minutos?',
      answer: 'A calculadora permite somar ou subtrair dois horários, mostrando o resultado em horas e minutos formatados.'
    },
    {
      question: 'Qual formato de hora devo usar?',
      answer: 'Use o formato HH:MM (24 horas), por exemplo: 08:30, 14:45, 23:59.'
    },
    {
      question: 'Posso subtrair um horário maior de um menor?',
      answer: 'Sim, a calculadora ajusta automaticamente para o formato de 24 horas quando necessário.'
    },
    {
      question: 'Como interpretar os resultados?',
      answer: 'O resultado mostra o horário final em formato HH:MM e também o total em minutos e horas decimais.'
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
            name: 'Horas e Minutos',
            description: 'Calcula e converte entre horas e minutos, soma e subtrai tempos',
            url: '/pt/calendario/horas-e-minutos',
            category: 'calendario'
          }))
        }}
      />
      
      <Container>
        <div className="py-8">
          <BreadcrumbsPT items={breadcrumbs} />
          
          <CalculatorLayout
            title="Horas e Minutos"
            description="Calcula e converte entre horas e minutos, soma e subtrai tempos"
            examples={examples}
            onExampleClick={(values) => {
              if (values.time1) setTime1(values.time1 as string)
              if (values.time2) setTime2(values.time2 as string)
              if (values.operation) setOperation(values.operation as 'add' | 'subtract')
            }}
            relatedLinks={relatedLinks}
          >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time1" className="text-base font-medium">Primeiro Horário</Label>
                <Input
                  id="time1"
                  type="time"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="min-h-[48px] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time2" className="text-base font-medium">Segundo Horário</Label>
                <Input
                  id="time2"
                  type="time"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
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
                  <SelectItem value="add">Somar (+)</SelectItem>
                  <SelectItem value="subtract">Subtrair (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-6">
              <Button onClick={handleCalculate} className="calculator-button w-full min-h-[48px] text-base font-medium">
                <Calculator className="h-5 w-5" />
                Calcular Tempo
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
                    <Clock className="h-5 w-5" />
                    Resultado do Cálculo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {String(results.hours).padStart(2, '0')}:{String(results.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-600">Horário Final</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{results.totalMinutes}</div>
                      <div className="text-sm text-gray-600">Total Minutos</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.totalHours.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Total Horas</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Detalhes do Cálculo:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Primeiro Horário:</strong> {results.breakdown.time1}</li>
                      <li><strong>Segundo Horário:</strong> {results.breakdown.time2}</li>
                      <li><strong>Operação:</strong> {results.breakdown.operation}</li>
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
