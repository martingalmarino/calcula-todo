"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Clock, Calculator } from 'lucide-react'
import { calculateUptime, type UptimeResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function UptimeDowntimeClientPT() {
  const [uptimePercentage, setUptimePercentage] = useState('')
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month')
  const [results, setResults] = useState<UptimeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!uptimePercentage) {
      setError('Por favor, digite a porcentagem de uptime')
      return
    }

    try {
      const percentage = parseFloat(uptimePercentage)
      
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        setError('Por favor, digite uma porcentagem válida entre 0 e 100')
        return
      }

      const result = calculateUptime(percentage, period)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular uptime')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Tecnologia', href: '/pt/tecnologia/' },
    { label: 'Uptime/Downtime', href: '/pt/tecnologia/uptime-downtime/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 99.9% por mês',
      values: { uptimePercentage: '99.9', period: 'month' }
    },
    {
      label: 'Exemplo: 99.5% por ano',
      values: { uptimePercentage: '99.5', period: 'year' }
    },
    {
      label: 'Exemplo: 99.99% por dia',
      values: { uptimePercentage: '99.99', period: 'day' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é uptime e downtime?',
      answer: 'Uptime é o tempo que um serviço está funcionando e disponível. Downtime é o tempo que está fora de serviço ou indisponível.'
    },
    {
      question: 'Qual é um bom nível de uptime?',
      answer: '99.9% (8.76 horas de downtime por ano) é considerado bom. 99.99% (52.56 minutos por ano) é excelente. 99.999% (5.26 minutos por ano) é excepcional.'
    },
    {
      question: 'Como calcular uptime?',
      answer: 'Uptime = (Tempo total - Tempo de indisponibilidade) / Tempo total × 100. É expresso como porcentagem do tempo total.'
    },
    {
      question: 'O que causa downtime?',
      answer: 'Manutenção programada, falhas de hardware, problemas de rede, ataques DDoS, bugs de software e falhas de energia são causas comuns.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Análise de Latência',
      href: '/pt/tecnologia/analise-latencia/'
    },
    {
      label: 'Velocidade de Download',
      href: '/pt/tecnologia/velocidade-download/'
    },
    {
      label: 'Outras Calculadoras de Tecnologia',
      href: '/pt/tecnologia/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Uptime/Downtime',
            description: 'Calcula tempo de disponibilidade e indisponibilidade de serviços web',
            url: '/pt/tecnologia/uptime-downtime/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Uptime/Downtime"
            description="Calcula tempo de disponibilidade e indisponibilidade de serviços web"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setUptimePercentage(values.uptimePercentage as string)
              setPeriod(values.period as 'day' | 'month' | 'year')
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="uptimePercentage">Uptime (%)</Label>
                  <Input
                    id="uptimePercentage"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={uptimePercentage}
                    onChange={(e) => setUptimePercentage(e.target.value)}
                    placeholder="Ex: 99.9"
                  />
                </div>
                <div>
                  <Label htmlFor="period">Período</Label>
                  <Select value={period} onValueChange={(value: 'day' | 'month' | 'year') => setPeriod(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Por Dia</SelectItem>
                      <SelectItem value="month">Por Mês</SelectItem>
                      <SelectItem value="year">Por Ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Uptime/Downtime
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Uptime</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {results.uptimePercentage}%
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Downtime</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">
                          {results.downtime.formatted}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Período:</strong> {period === 'day' ? 'Por dia' : period === 'month' ? 'Por mês' : 'Por ano'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Tempo total do período:</strong> {results.totalPeriod.days} dias, {results.totalPeriod.hours} horas, {results.totalPeriod.minutes} minutos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Downtime detalhado:</strong> {results.downtime.minutes} minutos, {results.downtime.hours} horas, {results.downtime.days} dias
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
