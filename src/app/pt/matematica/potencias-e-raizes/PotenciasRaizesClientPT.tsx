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
import { Zap, Calculator } from 'lucide-react'
import { pow, sqrt, cbrt, root } from '@/lib/math/powerRoot'
import { jsonLdCalculator } from '@/lib/seo'

export default function PotenciasRaizesClientPT() {
  const [activeTab, setActiveTab] = useState('power')
  const [base, setBase] = useState('')
  const [exponent, setExponent] = useState('')
  const [number, setNumber] = useState('')
  const [rootIndex, setRootIndex] = useState('')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
    isValid?: boolean;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    try {
      let result
      
      switch (activeTab) {
        case 'power':
          if (!base || !exponent) {
            setError('Por favor, preencha base e expoente')
            return
          }
          result = pow(parseFloat(base), parseFloat(exponent))
          break
          
        case 'sqrt':
          if (!number) {
            setError('Por favor, preencha o número')
            return
          }
          result = sqrt(parseFloat(number))
          break
          
        case 'cbrt':
          if (!number) {
            setError('Por favor, preencha o número')
            return
          }
          result = cbrt(parseFloat(number))
          break
          
        case 'nthRoot':
          if (!number || !rootIndex) {
            setError('Por favor, preencha número e índice da raiz')
            return
          }
          result = root(parseFloat(number), parseFloat(rootIndex))
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
    { label: 'Calculadora de Potências e Raízes', href: '/pt/matematica/potencias-raizes/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 2^8',
      values: { base: '2', exponent: '8' }
    },
    {
      label: 'Exemplo: √64',
      values: { number: '64' }
    },
    {
      label: 'Exemplo: ∛27',
      values: { number: '27' }
    }
  ]

  const faqItems = [
    {
      question: 'Como calcular potências?',
      answer: 'Para calcular uma potência, multiplique a base por ela mesma o número de vezes indicado pelo expoente. Por exemplo: 2³ = 2 × 2 × 2 = 8'
    },
    {
      question: 'O que é raiz quadrada?',
      answer: 'A raiz quadrada de um número é o valor que, quando multiplicado por si mesmo, resulta no número original. Por exemplo: √64 = 8, pois 8 × 8 = 64'
    },
    {
      question: 'O que é raiz cúbica?',
      answer: 'A raiz cúbica de um número é o valor que, quando multiplicado por si mesmo três vezes, resulta no número original. Por exemplo: ∛27 = 3, pois 3 × 3 × 3 = 27'
    },
    {
      question: 'Como calcular raiz n-ésima?',
      answer: 'A raiz n-ésima de um número é o valor que, quando elevado à potência n, resulta no número original. É o inverso da potenciação.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Álgebra',
      href: '/pt/matematica/algebra/'
    },
    {
      label: 'Calculadora de Derivadas',
      href: '/pt/matematica/derivadas/'
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
            name: 'Calculadora de Potências e Raízes',
            description: 'Calcular potências, raízes quadradas, cúbicas e n-ésimas',
            url: '/pt/matematica/potencias-raizes/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Potências e Raízes"
            description="Calcular potências, raízes quadradas, cúbicas e n-ésimas"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.base) setBase(values.base as string)
              if (values.exponent) setExponent(values.exponent as string)
              if (values.number) setNumber(values.number as string)
            }}
            relatedLinks={relatedLinks}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="power">Potência</TabsTrigger>
                <TabsTrigger value="sqrt">Raiz Quadrada</TabsTrigger>
                <TabsTrigger value="cbrt">Raiz Cúbica</TabsTrigger>
                <TabsTrigger value="nthRoot">Raiz N-ésima</TabsTrigger>
              </TabsList>

              <TabsContent value="power" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="base">Base</Label>
                    <Input
                      id="base"
                      type="number"
                      step="0.01"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      placeholder="Ex: 2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exponent">Expoente</Label>
                    <Input
                      id="exponent"
                      type="number"
                      step="0.01"
                      value={exponent}
                      onChange={(e) => setExponent(e.target.value)}
                      placeholder="Ex: 8"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: base^expoente
                </p>
              </TabsContent>

              <TabsContent value="sqrt" className="space-y-4">
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    type="number"
                    step="0.01"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ex: 64"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: √número
                </p>
              </TabsContent>

              <TabsContent value="cbrt" className="space-y-4">
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    type="number"
                    step="0.01"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ex: 27"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: ∛número
                </p>
              </TabsContent>

              <TabsContent value="nthRoot" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      type="number"
                      step="0.01"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Ex: 16"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rootIndex">Índice da Raiz</Label>
                    <Input
                      id="rootIndex"
                      type="number"
                      value={rootIndex}
                      onChange={(e) => setRootIndex(e.target.value)}
                      placeholder="Ex: 4"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: raiz n-ésima do número
                </p>
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
              <Card className="mt-4 bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-700 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Resultado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">
                        {results.result.toFixed(6)}
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
                  
                  {results.isValid === false && (
                    <Alert variant="destructive">
                      <AlertTitle>Atenção</AlertTitle>
                      <AlertDescription>
                        Esta operação não é válida. Verifique os valores inseridos.
                      </AlertDescription>
                    </Alert>
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
