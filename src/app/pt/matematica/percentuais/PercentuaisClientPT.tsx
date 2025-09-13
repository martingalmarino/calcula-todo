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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Percent, Calculator } from 'lucide-react'
import { percentageOf, percentageOfNumber, increase, decrease, variationPercent } from '@/lib/math/percentage'
import { jsonLdCalculator } from '@/lib/seo'

export default function PercentuaisClientPT() {
  const [activeTab, setActiveTab] = useState('percentageOf')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [percentage, setPercentage] = useState('')
  const [base, setBase] = useState('')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    try {
      let result
      
      switch (activeTab) {
        case 'percentageOf':
          if (!value1 || !value2) {
            setError('Por favor, preencha ambos os valores')
            return
          }
          result = percentageOf(parseFloat(value1), parseFloat(value2))
          break
          
        case 'percentageOfNumber':
          if (!percentage || !base) {
            setError('Por favor, preencha percentual e valor base')
            return
          }
          result = percentageOfNumber(parseFloat(percentage), parseFloat(base))
          break
          
        case 'increase':
          if (!value1 || !percentage) {
            setError('Por favor, preencha valor e percentual de aumento')
            return
          }
          result = increase(parseFloat(value1), parseFloat(percentage))
          break
          
        case 'decrease':
          if (!value1 || !percentage) {
            setError('Por favor, preencha valor e percentual de desconto')
            return
          }
          result = decrease(parseFloat(value1), parseFloat(percentage))
          break
          
        case 'percentageChange':
          if (!value1 || !value2) {
            setError('Por favor, preencha valor inicial e valor final')
            return
          }
          result = variationPercent(parseFloat(value1), parseFloat(value2))
          break
          
        default:
          setError('Operação não reconhecida')
          return
      }
      
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Matemática', href: '/pt/matematica/' },
    { label: 'Calculadora de Percentuais', href: '/pt/matematica/percentuais/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 25 é quantos % de 200?',
      values: { value1: '25', value2: '200' }
    },
    {
      label: 'Exemplo: 15% de 500',
      values: { percentage: '15', base: '500' }
    },
    {
      label: 'Exemplo: Aumentar 100 em 20%',
      values: { value1: '100', percentage: '20' }
    }
  ]

  const faqItems = [
    {
      question: 'Como calcular percentual?',
      answer: 'Para calcular percentual, divida o valor pelo total e multiplique por 100. Por exemplo: (25 ÷ 200) × 100 = 12.5%'
    },
    {
      question: 'Como calcular desconto?',
      answer: 'Para calcular desconto, multiplique o valor pelo percentual de desconto e subtraia do valor original. Por exemplo: 100 - (100 × 0.15) = 85'
    },
    {
      question: 'Como calcular aumento?',
      answer: 'Para calcular aumento, multiplique o valor pelo percentual de aumento e some ao valor original. Por exemplo: 100 + (100 × 0.20) = 120'
    },
    {
      question: 'O que é variação percentual?',
      answer: 'É a diferença entre dois valores expressa como percentual do valor inicial. Indica se houve aumento ou diminuição e em quanto.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Frações',
      href: '/pt/matematica/fracoes/'
    },
    {
      label: 'Calculadora de Álgebra',
      href: '/pt/matematica/algebra/'
    },
    {
      label: 'Outras Calculadoras de Matemática',
      href: '/pt/matematica/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Percentuais',
            description: 'Calcular percentuais, descontos, aumentos e variações percentuais',
            url: '/pt/matematica/percentuais/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Percentuais"
            description="Calcular percentuais, descontos, aumentos e variações percentuais"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.value1) setValue1(values.value1 as string)
              if (values.value2) setValue2(values.value2 as string)
              if (values.percentage) setPercentage(values.percentage as string)
              if (values.base) setBase(values.base as string)
            }}
            relatedLinks={relatedLinks}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-3">
                <TabsTrigger value="percentageOf" className="min-h-[56px] text-base font-medium px-4">% de</TabsTrigger>
                <TabsTrigger value="percentageOfNumber" className="min-h-[56px] text-base font-medium px-4">% de Número</TabsTrigger>
                <TabsTrigger value="increase" className="min-h-[56px] text-base font-medium px-4">Aumento</TabsTrigger>
                <TabsTrigger value="decrease" className="min-h-[56px] text-base font-medium px-4">Desconto</TabsTrigger>
                <TabsTrigger value="percentageChange" className="min-h-[56px] text-base font-medium px-4 col-span-1 sm:col-span-2 lg:col-span-1">Variação</TabsTrigger>
              </TabsList>

              <TabsContent value="percentageOf" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value1" className="text-base font-medium">Valor (X)</Label>
                    <Input
                      id="value1"
                      type="number"
                      step="0.01"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder="Ex: 25"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value2" className="text-base font-medium">Total (Y)</Label>
                    <Input
                      id="value2"
                      type="number"
                      step="0.01"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      placeholder="Ex: 200"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
                <p className="text-base text-muted-foreground text-center">
                  Calcula: X é quantos % de Y?
                </p>
              </TabsContent>

              <TabsContent value="percentageOfNumber" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="percentage" className="text-base font-medium">Percentual (%)</Label>
                    <Input
                      id="percentage"
                      type="number"
                      step="0.01"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="Ex: 15"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="base" className="text-base font-medium">Valor Base</Label>
                    <Input
                      id="base"
                      type="number"
                      step="0.01"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      placeholder="Ex: 500"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
                <p className="text-base text-muted-foreground text-center">
                  Calcula: X% de um número
                </p>
              </TabsContent>

              <TabsContent value="increase" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value1" className="text-base font-medium">Valor Inicial</Label>
                    <Input
                      id="value1"
                      type="number"
                      step="0.01"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder="Ex: 100"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage" className="text-base font-medium">% de Aumento</Label>
                    <Input
                      id="percentage"
                      type="number"
                      step="0.01"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="Ex: 20"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
                <p className="text-base text-muted-foreground text-center">
                  Calcula: Valor + X% de aumento
                </p>
              </TabsContent>

              <TabsContent value="decrease" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value1" className="text-base font-medium">Valor Inicial</Label>
                    <Input
                      id="value1"
                      type="number"
                      step="0.01"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder="Ex: 100"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage" className="text-base font-medium">% de Desconto</Label>
                    <Input
                      id="percentage"
                      type="number"
                      step="0.01"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="Ex: 15"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
                <p className="text-base text-muted-foreground text-center">
                  Calcula: Valor - X% de desconto
                </p>
              </TabsContent>

              <TabsContent value="percentageChange" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value1" className="text-base font-medium">Valor Inicial</Label>
                    <Input
                      id="value1"
                      type="number"
                      step="0.01"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder="Ex: 100"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value2" className="text-base font-medium">Valor Final</Label>
                    <Input
                      id="value2"
                      type="number"
                      step="0.01"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      placeholder="Ex: 120"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
                <p className="text-base text-muted-foreground text-center">
                  Calcula: Variação percentual entre dois valores
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Button onClick={handleCalculate} className="calculator-button w-full min-h-[48px] text-base font-medium">
                <Calculator className="h-5 w-5" />
                Calcular
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Card className="mt-4 bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Resultado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {results.result.toFixed(2)}
                        {activeTab === 'percentageOf' || activeTab === 'percentageChange' ? '%' : ''}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Fórmula: {results.formula}
                      </p>
                    </div>
                  </div>
                  
                  {results.steps && results.steps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Passos da resolução:</h4>
                      <div className="space-y-1">
                        {results.steps.map((step: string, index: number) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
