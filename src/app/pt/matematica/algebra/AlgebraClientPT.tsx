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
import { X, Calculator } from 'lucide-react'
import { solveLinear, solveQuadratic, solveSystem2x2 } from '@/lib/math/algebra'
import { jsonLdCalculator } from '@/lib/seo'

export default function AlgebraClientPT() {
  const [activeTab, setActiveTab] = useState('linear')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [a1, setA1] = useState('')
  const [b1, setB1] = useState('')
  const [c1, setC1] = useState('')
  const [a2, setA2] = useState('')
  const [b2, setB2] = useState('')
  const [c2, setC2] = useState('')
  const [results, setResults] = useState<{
    x?: number;
    x1?: number | null;
    x2?: number | null;
    y?: number;
    discriminant?: number;
    nature?: string;
    method?: string;
    formula?: string;
    steps: string[];
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    try {
      let result
      
      switch (activeTab) {
        case 'linear':
          if (!a || !b) {
            setError('Por favor, preencha os coeficientes a e b')
            return
          }
          result = solveLinear(parseFloat(a), parseFloat(b), 'es')
          break
          
        case 'quadratic':
          if (!a || !b || !c) {
            setError('Por favor, preencha os coeficientes a, b e c')
            return
          }
          result = solveQuadratic(parseFloat(a), parseFloat(b), parseFloat(c), 'es')
          break
          
        case 'system':
          if (!a1 || !b1 || !c1 || !a2 || !b2 || !c2) {
            setError('Por favor, preencha todos os coeficientes do sistema')
            return
          }
          result = solveSystem2x2(
            parseFloat(a1), parseFloat(b1), parseFloat(c1),
            parseFloat(a2), parseFloat(b2), parseFloat(c2),
            'es'
          )
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
    { label: 'Calculadora de Álgebra', href: '/pt/matematica/algebra/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 2x + 6 = 0',
      values: { a: '2', b: '6' }
    },
    {
      label: 'Exemplo: x² - 5x + 6 = 0',
      values: { a: '1', b: '-5', c: '6' }
    },
    {
      label: 'Exemplo: Sistema 2x2',
      values: { a1: '2', b1: '3', c1: '7', a2: '1', b2: '-1', c2: '1' }
    }
  ]

  const faqItems = [
    {
      question: 'Como resolver equações lineares?',
      answer: 'Para resolver ax + b = 0, isole x: x = -b/a. Por exemplo: 2x + 6 = 0 → x = -6/2 = -3'
    },
    {
      question: 'Como resolver equações quadráticas?',
      answer: 'Use a fórmula quadrática: x = (-b ± √(b²-4ac)) / 2a. O discriminante (b²-4ac) determina o tipo de solução.'
    },
    {
      question: 'Como resolver sistemas de equações?',
      answer: 'Use métodos de substituição ou eliminação. Para sistemas 2x2, pode usar a regra de Cramer ou eliminação gaussiana.'
    },
    {
      question: 'O que é o discriminante?',
      answer: 'O discriminante (Δ = b²-4ac) determina a natureza das raízes: Δ > 0 (duas raízes reais distintas), Δ = 0 (uma raiz real), Δ < 0 (raízes complexas).'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Potências e Raízes',
      href: '/pt/matematica/potencias-raizes/'
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
            name: 'Calculadora de Álgebra',
            description: 'Resolver equações lineares, quadráticas e sistemas de equações',
            url: '/pt/matematica/algebra/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Álgebra"
            description="Resolver equações lineares, quadráticas e sistemas de equações"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.a) setA(values.a as string)
              if (values.b) setB(values.b as string)
              if (values.c) setC(values.c as string)
              if (values.a1) setA1(values.a1 as string)
              if (values.b1) setB1(values.b1 as string)
              if (values.c1) setC1(values.c1 as string)
              if (values.a2) setA2(values.a2 as string)
              if (values.b2) setB2(values.b2 as string)
              if (values.c2) setC2(values.c2 as string)
            }}
            relatedLinks={relatedLinks}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="linear">Linear</TabsTrigger>
                <TabsTrigger value="quadratic">Quadrática</TabsTrigger>
                <TabsTrigger value="system">Sistema 2x2</TabsTrigger>
              </TabsList>

              <TabsContent value="linear" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="a">Coeficiente a</Label>
                    <Input
                      id="a"
                      type="number"
                      step="0.01"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="Ex: 2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="b">Coeficiente b</Label>
                    <Input
                      id="b"
                      type="number"
                      step="0.01"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="Ex: 6"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Resolve: ax + b = 0
                </p>
              </TabsContent>

              <TabsContent value="quadratic" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="a">Coeficiente a</Label>
                    <Input
                      id="a"
                      type="number"
                      step="0.01"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="Ex: 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="b">Coeficiente b</Label>
                    <Input
                      id="b"
                      type="number"
                      step="0.01"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="Ex: -5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c">Coeficiente c</Label>
                    <Input
                      id="c"
                      type="number"
                      step="0.01"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="Ex: 6"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Resolve: ax² + bx + c = 0
                </p>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Primeira equação: a₁x + b₁y = c₁</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={a1}
                        onChange={(e) => setA1(e.target.value)}
                        placeholder="a₁"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        value={b1}
                        onChange={(e) => setB1(e.target.value)}
                        placeholder="b₁"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        value={c1}
                        onChange={(e) => setC1(e.target.value)}
                        placeholder="c₁"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Segunda equação: a₂x + b₂y = c₂</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={a2}
                        onChange={(e) => setA2(e.target.value)}
                        placeholder="a₂"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        value={b2}
                        onChange={(e) => setB2(e.target.value)}
                        placeholder="b₂"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        value={c2}
                        onChange={(e) => setC2(e.target.value)}
                        placeholder="c₂"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4">
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Resolver
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Card className="mt-4 bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center gap-2">
                    <X className="h-5 w-5" />
                    Resultado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center">
                      {activeTab === 'linear' && (
                        <div>
                          <p className="text-3xl font-bold text-orange-600">
                            x = {results.x}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Fórmula: {results.formula}
                          </p>
                        </div>
                      )}
                      
                      {activeTab === 'quadratic' && (
                        <div>
                          <p className="text-2xl font-bold text-orange-600">
                            {results.x1 !== null ? `x₁ = ${results.x1}` : 'x₁ = N/A'}
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            {results.x2 !== null ? `x₂ = ${results.x2}` : 'x₂ = N/A'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Discriminante: {results.discriminant}
                          </p>
                          <p className="text-sm text-gray-600">
                            Natureza: {results.nature}
                          </p>
                        </div>
                      )}
                      
                      {activeTab === 'system' && (
                        <div>
                          <p className="text-2xl font-bold text-orange-600">
                            x = {results.x}
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            y = {results.y}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Método: {results.method}
                          </p>
                        </div>
                      )}
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
