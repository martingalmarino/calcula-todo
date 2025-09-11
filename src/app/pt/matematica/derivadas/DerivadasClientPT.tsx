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
import { TrendingUp, Calculator } from 'lucide-react'
import { numericalDerivative, forwardDifferenceDerivative, backwardDifferenceDerivative } from '@/lib/math/calculus'
import { jsonLdCalculator } from '@/lib/seo'

export default function DerivadasClientPT() {
  const [activeTab, setActiveTab] = useState('numerical')
  const [functionStr, setFunctionStr] = useState('')
  const [x0, setX0] = useState('')
  const [h, setH] = useState('0.001')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
    method: string;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Função para avaliar expressões matemáticas simples
  const evaluateFunction = (funcStr: string, x: number): number => {
    try {
      // Substituir x na expressão
      const expression = funcStr.replace(/x/g, `(${x})`)
      
      // Funções matemáticas básicas
      const mathFunctions = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        sqrt: Math.sqrt,
        abs: Math.abs,
        exp: Math.exp,
        log: Math.log,
        pow: Math.pow
      }
      
      // Criar função segura
      const func = new Function(...Object.keys(mathFunctions), `return ${expression}`)
      return func(...Object.values(mathFunctions))
    } catch (err) {
      throw new Error('Expressão inválida')
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    try {
      if (!functionStr || !x0) {
        setError('Por favor, preencha a função e o ponto x')
        return
      }

      const x0Num = parseFloat(x0)
      const hNum = parseFloat(h)
      
      if (isNaN(x0Num)) {
        setError('Por favor, digite um valor válido para x')
        return
      }
      
      if (isNaN(hNum) || hNum <= 0) {
        setError('Por favor, digite um valor válido para h (deve ser maior que 0)')
        return
      }

      let result
      
      switch (activeTab) {
        case 'numerical':
          result = numericalDerivative(
            (x) => evaluateFunction(functionStr, x),
            x0Num,
            hNum
          )
          break
          
        case 'forward':
          result = forwardDifferenceDerivative(
            (x) => evaluateFunction(functionStr, x),
            x0Num,
            hNum
          )
          break
          
        case 'backward':
          result = backwardDifferenceDerivative(
            (x) => evaluateFunction(functionStr, x),
            x0Num,
            hNum
          )
          break
          
        default:
          setError('Método não reconhecido')
          return
      }
      
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a derivada')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Matemática', href: '/pt/matematica/' },
    { label: 'Calculadora de Derivadas', href: '/pt/matematica/derivadas/' }
  ]

  const examples = [
    {
      label: 'Exemplo: x^2 em x=2',
      values: { functionStr: 'x*x', x0: '2' }
    },
    {
      label: 'Exemplo: sin(x) em x=π/4',
      values: { functionStr: 'sin(x)', x0: '0.785' }
    },
    {
      label: 'Exemplo: exp(x) em x=1',
      values: { functionStr: 'exp(x)', x0: '1' }
    }
  ]

  const faqItems = [
    {
      question: 'Como calcular derivadas numericamente?',
      answer: 'Use diferenças finitas: f&apos;(x) ≈ [f(x+h) - f(x-h)] / (2h). Quanto menor o h, mais precisa a aproximação.'
    },
    {
      question: 'Qual método é mais preciso?',
      answer: 'Diferenças centradas são geralmente mais precisas que diferenças para frente ou para trás, pois cancelam erros de truncamento.'
    },
    {
      question: 'Como escolher o valor de h?',
      answer: 'h muito pequeno pode causar erros de arredondamento, h muito grande causa erros de truncamento. Valores típicos: 0.001 a 0.01.'
    },
    {
      question: 'Que funções posso usar?',
      answer: 'Funções básicas: +, -, *, /, ^, sin, cos, tan, sqrt, abs, exp, log. Use x como variável.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Álgebra',
      href: '/pt/matematica/algebra/'
    },
    {
      label: 'Calculadora de Trigonometria',
      href: '/pt/matematica/trigonometria/'
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
            name: 'Calculadora de Derivadas',
            description: 'Calcular derivadas numéricas e analíticas de funções',
            url: '/pt/matematica/derivadas/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Derivadas"
            description="Calcular derivadas numéricas e analíticas de funções"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.functionStr) setFunctionStr(values.functionStr as string)
              if (values.x0) setX0(values.x0 as string)
            }}
            relatedLinks={relatedLinks}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 p-2">
                <TabsTrigger value="numerical" className="min-h-[48px] text-sm font-medium">Diferenças Centradas</TabsTrigger>
                <TabsTrigger value="forward" className="min-h-[48px] text-sm font-medium">Diferenças para Frente</TabsTrigger>
                <TabsTrigger value="backward" className="min-h-[48px] text-sm font-medium">Diferenças para Trás</TabsTrigger>
              </TabsList>

              <TabsContent value="numerical" className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="function" className="text-base font-medium">Função f(x)</Label>
                    <Input
                      id="function"
                      type="text"
                      value={functionStr}
                      onChange={(e) => setFunctionStr(e.target.value)}
                      placeholder="Ex: x*x, sin(x), exp(x)"
                      className="min-h-[48px] text-base"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use x como variável. Funções disponíveis: sin, cos, tan, sqrt, abs, exp, log, pow
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="x0" className="text-base font-medium">Ponto x</Label>
                      <Input
                        id="x0"
                        type="number"
                        step="0.01"
                        value={x0}
                        onChange={(e) => setX0(e.target.value)}
                        placeholder="Ex: 2"
                        className="min-h-[48px] text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h" className="text-base font-medium">Passo h</Label>
                      <Input
                        id="h"
                        type="number"
                        step="0.001"
                        value={h}
                        onChange={(e) => setH(e.target.value)}
                        placeholder="Ex: 0.001"
                        className="min-h-[48px] text-base"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-base text-muted-foreground text-center">
                  Calcula: f&apos;(x) ≈ [f(x+h) - f(x-h)] / (2h)
                </p>
              </TabsContent>

              <TabsContent value="forward" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="function">Função f(x)</Label>
                    <Input
                      id="function"
                      type="text"
                      value={functionStr}
                      onChange={(e) => setFunctionStr(e.target.value)}
                      placeholder="Ex: x*x, sin(x), exp(x)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use x como variável. Funções disponíveis: sin, cos, tan, sqrt, abs, exp, log, pow
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="x0">Ponto x</Label>
                      <Input
                        id="x0"
                        type="number"
                        step="0.01"
                        value={x0}
                        onChange={(e) => setX0(e.target.value)}
                        placeholder="Ex: 2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="h">Passo h</Label>
                      <Input
                        id="h"
                        type="number"
                        step="0.001"
                        value={h}
                        onChange={(e) => setH(e.target.value)}
                        placeholder="Ex: 0.001"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: f&apos;(x) ≈ [f(x+h) - f(x)] / h
                </p>
              </TabsContent>

              <TabsContent value="backward" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="function">Função f(x)</Label>
                    <Input
                      id="function"
                      type="text"
                      value={functionStr}
                      onChange={(e) => setFunctionStr(e.target.value)}
                      placeholder="Ex: x*x, sin(x), exp(x)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use x como variável. Funções disponíveis: sin, cos, tan, sqrt, abs, exp, log, pow
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="x0">Ponto x</Label>
                      <Input
                        id="x0"
                        type="number"
                        step="0.01"
                        value={x0}
                        onChange={(e) => setX0(e.target.value)}
                        placeholder="Ex: 2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="h">Passo h</Label>
                      <Input
                        id="h"
                        type="number"
                        step="0.001"
                        value={h}
                        onChange={(e) => setH(e.target.value)}
                        placeholder="Ex: 0.001"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: f&apos;(x) ≈ [f(x) - f(x-h)] / h
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Button onClick={handleCalculate} className="calculator-button w-full min-h-[48px] text-base font-medium">
                <Calculator className="h-5 w-5" />
                Calcular Derivada
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Card className="mt-4 bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Resultado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-600">
                        f&apos;({x0}) ≈ {results.result.toFixed(6)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Método: {results.method}
                      </p>
                      <p className="text-sm text-gray-600">
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
