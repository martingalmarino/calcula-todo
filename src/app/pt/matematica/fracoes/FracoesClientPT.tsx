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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Divide, Calculator } from 'lucide-react'
import { simplify, add, subtract, multiply, divide, toDecimal, fromDecimal } from '@/lib/math/fractions'
import { jsonLdCalculator } from '@/lib/seo'

export default function FracoesClientPT() {
  const [activeTab, setActiveTab] = useState('simplify')
  const [num1, setNum1] = useState('')
  const [den1, setDen1] = useState('')
  const [num2, setNum2] = useState('')
  const [den2, setDen2] = useState('')
  const [decimal, setDecimal] = useState('')
  const [results, setResults] = useState<{
    result: { numerator: number; denominator: number };
    decimal: number;
    steps: string[];
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    try {
      let result
      
      switch (activeTab) {
        case 'simplify':
          if (!num1 || !den1) {
            setError('Por favor, preencha numerador e denominador')
            return
          }
          result = simplify(parseInt(num1), parseInt(den1), 'es')
          break
          
        case 'add':
          if (!num1 || !den1 || !num2 || !den2) {
            setError('Por favor, preencha todas as frações')
            return
          }
          result = add({ numerator: parseInt(num1), denominator: parseInt(den1) }, { numerator: parseInt(num2), denominator: parseInt(den2) }, 'es')
          break
          
        case 'subtract':
          if (!num1 || !den1 || !num2 || !den2) {
            setError('Por favor, preencha todas as frações')
            return
          }
          result = subtract({ numerator: parseInt(num1), denominator: parseInt(den1) }, { numerator: parseInt(num2), denominator: parseInt(den2) }, 'es')
          break
          
        case 'multiply':
          if (!num1 || !den1 || !num2 || !den2) {
            setError('Por favor, preencha todas as frações')
            return
          }
          result = multiply({ numerator: parseInt(num1), denominator: parseInt(den1) }, { numerator: parseInt(num2), denominator: parseInt(den2) }, 'es')
          break
          
        case 'divide':
          if (!num1 || !den1 || !num2 || !den2) {
            setError('Por favor, preencha todas as frações')
            return
          }
          result = divide({ numerator: parseInt(num1), denominator: parseInt(den1) }, { numerator: parseInt(num2), denominator: parseInt(den2) }, 'es')
          break
          
        case 'toDecimal':
          if (!num1 || !den1) {
            setError('Por favor, preencha numerador e denominador')
            return
          }
          result = { result: { numerator: parseInt(num1), denominator: parseInt(den1) }, decimal: toDecimal(parseInt(num1), parseInt(den1), 'es'), steps: [] }
          break
          
        case 'fromDecimal':
          if (!decimal) {
            setError('Por favor, preencha o valor decimal')
            return
          }
          result = fromDecimal(parseFloat(decimal), 6, 'es')
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
    { label: 'Calculadora de Frações', href: '/pt/matematica/fracoes/' }
  ]

  const examples = [
    {
      label: 'Exemplo: Simplificar 12/18',
      values: { num1: '12', den1: '18' }
    },
    {
      label: 'Exemplo: Somar 1/4 + 1/3',
      values: { num1: '1', den1: '4', num2: '1', den2: '3' }
    },
    {
      label: 'Exemplo: Converter 0.75 para fração',
      values: { decimal: '0.75' }
    }
  ]

  const faqItems = [
    {
      question: 'Como simplificar uma fração?',
      answer: 'Para simplificar uma fração, encontre o máximo divisor comum (MDC) entre o numerador e denominador, depois divida ambos pelo MDC.'
    },
    {
      question: 'Como somar frações com denominadores diferentes?',
      answer: 'Primeiro encontre o mínimo múltiplo comum (MMC) dos denominadores, depois converta as frações para o mesmo denominador e some os numeradores.'
    },
    {
      question: 'Como converter decimal para fração?',
      answer: 'Multiplique o decimal por uma potência de 10 para eliminar as casas decimais, depois simplifique a fração resultante.'
    },
    {
      question: 'O que é uma fração irredutível?',
      answer: 'É uma fração que não pode ser simplificada mais, ou seja, o numerador e denominador não têm divisores comuns além de 1.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Percentuais',
      href: '/pt/matematica/percentuais/'
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
            name: 'Calculadora de Frações',
            description: 'Simplificar, converter, somar, subtrair, multiplicar e dividir frações',
            url: '/pt/matematica/fracoes/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Frações"
            description="Simplificar, converter, somar, subtrair, multiplicar e dividir frações"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.num1) setNum1(values.num1 as string)
              if (values.den1) setDen1(values.den1 as string)
              if (values.num2) setNum2(values.num2 as string)
              if (values.den2) setDen2(values.den2 as string)
              if (values.decimal) setDecimal(values.decimal as string)
            }}
            relatedLinks={relatedLinks}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="simplify">Simplificar</TabsTrigger>
                <TabsTrigger value="add">Somar</TabsTrigger>
                <TabsTrigger value="subtract">Subtrair</TabsTrigger>
                <TabsTrigger value="multiply">Multiplicar</TabsTrigger>
                <TabsTrigger value="divide">Dividir</TabsTrigger>
                <TabsTrigger value="toDecimal">Para Decimal</TabsTrigger>
                <TabsTrigger value="fromDecimal">De Decimal</TabsTrigger>
              </TabsList>

              <TabsContent value="simplify" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="num1">Numerador</Label>
                    <Input
                      id="num1"
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      placeholder="Ex: 12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="den1">Denominador</Label>
                    <Input
                      id="den1"
                      type="number"
                      value={den1}
                      onChange={(e) => setDen1(e.target.value)}
                      placeholder="Ex: 18"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="add" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primeira Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Segunda Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="subtract" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primeira Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Segunda Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="multiply" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primeira Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Segunda Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="divide" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primeira Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Segunda Fração</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="Numerador"
                      />
                      <Input
                        type="number"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        placeholder="Denominador"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="toDecimal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="num1">Numerador</Label>
                    <Input
                      id="num1"
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      placeholder="Ex: 3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="den1">Denominador</Label>
                    <Input
                      id="den1"
                      type="number"
                      value={den1}
                      onChange={(e) => setDen1(e.target.value)}
                      placeholder="Ex: 4"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fromDecimal" className="space-y-4">
                <div>
                  <Label htmlFor="decimal">Valor Decimal</Label>
                  <Input
                    id="decimal"
                    type="number"
                    step="0.01"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    placeholder="Ex: 0.75"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4">
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
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
              <Card className="mt-4 bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    <Divide className="h-5 w-5" />
                    Resultado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {results.result.numerator}/{results.result.denominator}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Valor decimal: {results.decimal}
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
