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
import { TrendingUp, Calculator } from 'lucide-react'
import { calcularInteresSimple } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function JurosSimplesClientPT() {
  const [capital, setCapital] = useState('')
  const [tasa, setTasa] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [results, setResults] = useState<{
    capital: number;
    tasa: number;
    tiempo: number;
    interes: number;
    montoTotal: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!capital || !tasa || !tiempo) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const capitalNum = parseFloat(capital)
      const tasaNum = parseFloat(tasa)
      const tiempoNum = parseFloat(tiempo)
      
      if (isNaN(capitalNum) || capitalNum <= 0) {
        setError('Por favor, digite um capital válido maior que zero')
        return
      }

      if (isNaN(tasaNum) || tasaNum <= 0) {
        setError('Por favor, digite uma taxa de juros válida maior que zero')
        return
      }

      if (isNaN(tiempoNum) || tiempoNum <= 0) {
        setError('Por favor, digite um tempo válido maior que zero')
        return
      }

      const result = calcularInteresSimple(capitalNum, tasaNum / 100, tiempoNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular os juros')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Finanças', href: '/pt/financas/' },
    { label: 'Juros Simples', href: '/pt/financas/juros-simples/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 1.000, 12% ao ano, 2 anos',
      values: { capital: '1000', tasa: '12', tiempo: '2' }
    },
    {
      label: 'Exemplo: R$ 5.000, 8% ao ano, 6 meses',
      values: { capital: '5000', tasa: '8', tiempo: '0.5' }
    },
    {
      label: 'Exemplo: R$ 2.500, 15% ao ano, 1 ano',
      values: { capital: '2500', tasa: '15', tiempo: '1' }
    }
  ]

  const faqItems = [
    {
      question: 'O que são juros simples?',
      answer: 'Os juros simples são calculados apenas sobre o capital inicial, sem considerar os juros acumulados de períodos anteriores. É ideal para empréstimos curtos e operações simples.'
    },
    {
      question: 'Como calcular juros simples?',
      answer: 'A fórmula é: J = C × i × t, onde J = juros, C = capital, i = taxa de juros e t = tempo. O montante total é M = C + J.'
    },
    {
      question: 'Qual a diferença entre juros simples e compostos?',
      answer: 'Juros simples são calculados apenas sobre o capital inicial, enquanto juros compostos são calculados sobre o capital inicial mais os juros acumulados.'
    },
    {
      question: 'Quando usar juros simples?',
      answer: 'Use juros simples para empréstimos de curto prazo, descontos comerciais, dívidas básicas e operações financeiras simples onde não há capitalização de juros.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Financiamento',
      href: '/pt/financas/calculadora-financiamento/'
    },
    {
      label: 'Valor Futuro e Presente',
      href: '/pt/financas/valor-futuro-presente/'
    },
    {
      label: 'Outras Calculadoras de Finanças',
      href: '/pt/financas/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Juros Simples',
            description: 'Calcule juros simples para empréstimos curtos, descontos e dívidas básicas',
            url: '/pt/financas/juros-simples/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Juros Simples"
            description="Calcule juros simples para empréstimos curtos, descontos e dívidas básicas"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setCapital(values.capital as string)
              setTasa(values.tasa as string)
              setTiempo(values.tiempo as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="capital">Capital Inicial (R$)</Label>
                  <Input
                    id="capital"
                    type="number"
                    step="0.01"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    placeholder="Ex: 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="tasa">Taxa de Juros Anual (%)</Label>
                  <Input
                    id="tasa"
                    type="number"
                    step="0.01"
                    value={tasa}
                    onChange={(e) => setTasa(e.target.value)}
                    placeholder="Ex: 12"
                  />
                </div>
                <div>
                  <Label htmlFor="tiempo">Tempo (anos)</Label>
                  <Input
                    id="tiempo"
                    type="number"
                    step="0.01"
                    value={tiempo}
                    onChange={(e) => setTiempo(e.target.value)}
                    placeholder="Ex: 2"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Juros
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
                      <TrendingUp className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Capital Inicial</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          R$ {results.capital.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Juros Simples</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {results.interes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Montante Total</span>
                      </div>
                      <p className="text-3xl font-bold text-purple-600">
                        R$ {results.montoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Taxa de juros:</strong> {results.tasa}% ao ano
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Tempo:</strong> {results.tiempo} {results.tiempo === 1 ? 'ano' : 'anos'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Fórmula:</strong> J = C × i × t = {results.capital.toLocaleString('pt-BR')} × {results.tasa}% × {results.tiempo} = R$ {results.interes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
