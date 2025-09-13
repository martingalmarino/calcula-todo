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
import { Car, Calculator } from 'lucide-react'
import { calcularDepreciacionVehiculo } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function DepreciacaoVeiculosClientPT() {
  const [valorInicial, setValorInicial] = useState('')
  const [valorResidual, setValorResidual] = useState('')
  const [vidaUtil, setVidaUtil] = useState('')
  const [results, setResults] = useState<{
    valorInicial: number;
    valorResidual: number;
    vidaUtil: number;
    depreciacionAnual: number;
    depreciacionMensual: number;
    valorActual: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!valorInicial || !valorResidual || !vidaUtil) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const valorInicialNum = parseFloat(valorInicial)
      const valorResidualNum = parseFloat(valorResidual)
      const vidaUtilNum = parseFloat(vidaUtil)
      
      if (isNaN(valorInicialNum) || valorInicialNum <= 0) {
        setError('Por favor, digite um valor inicial válido maior que zero')
        return
      }

      if (isNaN(valorResidualNum) || valorResidualNum < 0) {
        setError('Por favor, digite um valor residual válido maior ou igual a zero')
        return
      }

      if (valorResidualNum >= valorInicialNum) {
        setError('O valor residual deve ser menor que o valor inicial')
        return
      }

      if (isNaN(vidaUtilNum) || vidaUtilNum <= 0) {
        setError('Por favor, digite uma vida útil válida maior que zero')
        return
      }

      const result = calcularDepreciacionVehiculo(valorInicialNum, valorResidualNum, vidaUtilNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a depreciação')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Finanças', href: '/pt/financas/' },
    { label: 'Depreciação de Veículos', href: '/pt/financas/depreciacao-veiculos/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 50.000, R$ 10.000, 5 anos',
      values: { valorInicial: '50000', valorResidual: '10000', vidaUtil: '5' }
    },
    {
      label: 'Exemplo: R$ 30.000, R$ 5.000, 4 anos',
      values: { valorInicial: '30000', valorResidual: '5000', vidaUtil: '4' }
    },
    {
      label: 'Exemplo: R$ 80.000, R$ 15.000, 7 anos',
      values: { valorInicial: '80000', valorResidual: '15000', vidaUtil: '7' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é depreciação de veículos?',
      answer: 'A depreciação é a perda de valor de um veículo ao longo do tempo devido ao uso, desgaste e obsolescência. É importante para planejamento financeiro e declaração de impostos.'
    },
    {
      question: 'Como calcular a depreciação?',
      answer: 'Usamos o método linear: Depreciação Anual = (Valor Inicial - Valor Residual) ÷ Vida Útil. A depreciação mensal é a anual dividida por 12.'
    },
    {
      question: 'Qual o valor residual típico?',
      answer: 'O valor residual varia entre 10% a 30% do valor inicial, dependendo da marca, modelo, uso e condições do veículo. Veículos de luxo tendem a ter maior valor residual.'
    },
    {
      question: 'Qual a vida útil padrão?',
      answer: 'A vida útil típica é de 4 a 7 anos para carros de passeio, dependendo do uso e manutenção. Veículos comerciais podem ter vida útil diferente.'
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
            name: 'Calculadora de Depreciação de Veículos',
            description: 'Calcule a depreciação de veículos usando métodos padrão do mercado',
            url: '/pt/financas/depreciacao-veiculos/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Depreciação de Veículos"
            description="Calcule a depreciação de veículos usando métodos padrão do mercado"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setValorInicial(values.valorInicial as string)
              setValorResidual(values.valorResidual as string)
              setVidaUtil(values.vidaUtil as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="valorInicial">Valor Inicial (R$)</Label>
                  <Input
                    id="valorInicial"
                    type="number"
                    step="0.01"
                    value={valorInicial}
                    onChange={(e) => setValorInicial(e.target.value)}
                    placeholder="Ex: 50000"
                  />
                </div>
                <div>
                  <Label htmlFor="valorResidual">Valor Residual (R$)</Label>
                  <Input
                    id="valorResidual"
                    type="number"
                    step="0.01"
                    value={valorResidual}
                    onChange={(e) => setValorResidual(e.target.value)}
                    placeholder="Ex: 10000"
                  />
                </div>
                <div>
                  <Label htmlFor="vidaUtil">Vida Útil (anos)</Label>
                  <Input
                    id="vidaUtil"
                    type="number"
                    step="0.1"
                    value={vidaUtil}
                    onChange={(e) => setVidaUtil(e.target.value)}
                    placeholder="Ex: 5"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Depreciação
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
                      <Car className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Depreciação Anual</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          R$ {results.depreciacionAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Depreciação Mensal</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {results.depreciacionMensual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Inicial</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">
                          R$ {results.valorInicial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Residual</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">
                          R$ {results.valorResidual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Vida útil:</strong> {results.vidaUtil} {results.vidaUtil === 1 ? 'ano' : 'anos'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Método:</strong> Depreciação Linear
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Fórmula:</strong> Depreciação Anual = (R$ {results.valorInicial.toLocaleString('pt-BR')} - R$ {results.valorResidual.toLocaleString('pt-BR')}) ÷ {results.vidaUtil} = R$ {results.depreciacionAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
