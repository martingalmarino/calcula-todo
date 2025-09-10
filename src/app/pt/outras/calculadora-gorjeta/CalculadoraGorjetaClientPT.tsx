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
import { DollarSign, Calculator } from 'lucide-react'
import { calculateTip, type TipCalculationResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalculadoraGorjetaClientPT() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState('15')
  const [peopleCount, setPeopleCount] = useState('1')
  const [results, setResults] = useState<TipCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!billAmount) {
      setError('Por favor, digite o valor da conta')
      return
    }

    try {
      const billNum = parseFloat(billAmount)
      const tipNum = parseFloat(tipPercentage)
      const peopleNum = parseInt(peopleCount)
      
      if (isNaN(billNum) || isNaN(tipNum) || isNaN(peopleNum)) {
        setError('Por favor, digite valores numéricos válidos')
        return
      }

      if (billNum <= 0) {
        setError('O valor da conta deve ser maior que zero')
        return
      }

      if (tipNum < 0 || tipNum > 100) {
        setError('A porcentagem da gorjeta deve estar entre 0% e 100%')
        return
      }

      if (peopleNum <= 0) {
        setError('O número de pessoas deve ser maior que zero')
        return
      }

      const result = calculateTip(billNum, tipNum, peopleNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a gorjeta')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Outras', href: '/pt/outras/' },
    { label: 'Calculadora de Gorjeta', href: '/pt/outras/calculadora-gorjeta/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 100, 15%, 2 pessoas',
      values: { billAmount: '100', tipPercentage: '15', peopleCount: '2' }
    },
    {
      label: 'Exemplo: R$ 75, 20%, 1 pessoa',
      values: { billAmount: '75', tipPercentage: '20', peopleCount: '1' }
    },
    {
      label: 'Exemplo: R$ 150, 18%, 4 pessoas',
      values: { billAmount: '150', tipPercentage: '18', peopleCount: '4' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual é a porcentagem padrão de gorjeta?',
      answer: 'A porcentagem padrão varia por país. No Brasil, 10-15% é comum. Em outros países, 15-20% é mais padrão. Use sua discrição baseada na qualidade do serviço.'
    },
    {
      question: 'Como dividir a conta entre várias pessoas?',
      answer: 'Digite o número de pessoas no campo correspondente. A calculadora mostrará quanto cada pessoa deve pagar incluindo a gorjeta.'
    },
    {
      question: 'A gorjeta é obrigatória?',
      answer: 'A gorjeta é voluntária e baseada na qualidade do serviço. É uma forma de reconhecer um bom atendimento, mas não é obrigatória.'
    },
    {
      question: 'Como calcular gorjeta para serviços diferentes?',
      answer: 'Para garçons, 15-20% é comum. Para entregadores, 10-15%. Para serviços de beleza, 15-20%. Ajuste conforme a qualidade do serviço.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadoras de Finanças',
      href: '/pt/financas/'
    },
    {
      label: 'Outras Calculadoras',
      href: '/pt/outras/'
    },
    {
      label: 'Calculadoras de Porcentagens',
      href: '/pt/matematicas/porcentajes/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Gorjeta',
            description: 'Calcula a gorjeta e o total a pagar em restaurantes',
            url: '/pt/outras/calculadora-gorjeta/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Gorjeta"
            description="Calcula a gorjeta e o total a pagar em restaurantes"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setBillAmount(values.billAmount as string)
              setTipPercentage(values.tipPercentage as string)
              setPeopleCount(values.peopleCount as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="billAmount">Valor da Conta (R$)</Label>
                  <Input
                    id="billAmount"
                    type="number"
                    step="0.01"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="Ex: 100.00"
                  />
                </div>
                <div>
                  <Label htmlFor="tipPercentage">Porcentagem da Gorjeta (%)</Label>
                  <Input
                    id="tipPercentage"
                    type="number"
                    value={tipPercentage}
                    onChange={(e) => setTipPercentage(e.target.value)}
                    placeholder="Ex: 15"
                  />
                </div>
                <div>
                  <Label htmlFor="peopleCount">Número de Pessoas</Label>
                  <Input
                    id="peopleCount"
                    type="number"
                    min="1"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    placeholder="Ex: 2"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Gorjeta
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor da Gorjeta</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">R$ {results.tipAmount.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Total a Pagar</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">R$ {results.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Valor por Pessoa</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">R$ {results.perPersonAmount.toFixed(2)}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Valor da conta:</strong> R$ {results.billAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Porcentagem da gorjeta:</strong> {results.tipPercentage}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Número de pessoas:</strong> {results.peopleCount}
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
