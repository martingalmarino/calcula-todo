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
import { Home, Calculator } from 'lucide-react'
import { calcularHipoteca } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalculadoraFinanciamentoClientPT() {
  const [monto, setMonto] = useState('')
  const [tasaAnual, setTasaAnual] = useState('')
  const [plazoAnos, setPlazoAnos] = useState('')
  const [results, setResults] = useState<{
    monto: number;
    tasaAnual: number;
    plazoAnos: number;
    cuotaMensual: number;
    totalPagos: number;
    totalIntereses: number;
    cronograma: Array<{
      mes: number;
      cuota: number;
      capital: number;
      interes: number;
      saldo: number;
    }>;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!monto || !tasaAnual || !plazoAnos) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const montoNum = parseFloat(monto)
      const tasaAnualNum = parseFloat(tasaAnual)
      const plazoAnosNum = parseFloat(plazoAnos)
      
      if (isNaN(montoNum) || montoNum <= 0) {
        setError('Por favor, digite um valor de financiamento válido maior que zero')
        return
      }

      if (isNaN(tasaAnualNum) || tasaAnualNum <= 0) {
        setError('Por favor, digite uma taxa de juros válida maior que zero')
        return
      }

      if (isNaN(plazoAnosNum) || plazoAnosNum <= 0) {
        setError('Por favor, digite um prazo válido maior que zero')
        return
      }

      const result = calcularHipoteca(montoNum, tasaAnualNum / 100, plazoAnosNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular o financiamento')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Finanças', href: '/pt/financas/' },
    { label: 'Calculadora de Financiamento', href: '/pt/financas/calculadora-financiamento/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 200.000, 8% ao ano, 20 anos',
      values: { monto: '200000', tasaAnual: '8', plazoAnos: '20' }
    },
    {
      label: 'Exemplo: R$ 150.000, 10% ao ano, 15 anos',
      values: { monto: '150000', tasaAnual: '10', plazoAnos: '15' }
    },
    {
      label: 'Exemplo: R$ 300.000, 12% ao ano, 25 anos',
      values: { monto: '300000', tasaAnual: '12', plazoAnos: '25' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é um financiamento?',
      answer: 'Um financiamento é um empréstimo de longo prazo usado para comprar imóveis, veículos ou outros bens de alto valor. O pagamento é feito em parcelas mensais que incluem capital e juros.'
    },
    {
      question: 'Como funciona o cálculo de financiamento?',
      answer: 'O cálculo usa a fórmula de amortização, onde cada parcela contém uma parte do capital e uma parte dos juros. Com o tempo, a parte de juros diminui e a de capital aumenta.'
    },
    {
      question: 'O que é taxa de juros anual?',
      answer: 'É a taxa de juros aplicada ao financiamento por ano. É importante verificar se é taxa nominal ou efetiva, pois isso afeta o valor final das parcelas.'
    },
    {
      question: 'Como escolher o prazo do financiamento?',
      answer: 'Prazos maiores resultam em parcelas menores, mas maior total de juros. Prazos menores têm parcelas maiores, mas menor custo total. Escolha baseado na sua capacidade de pagamento.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Juros Simples',
      href: '/pt/financas/juros-simples/'
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
            name: 'Calculadora de Financiamento',
            description: 'Calcule financiamentos com desdobramento mensal de capital e juros',
            url: '/pt/financas/calculadora-financiamento/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Financiamento"
            description="Calcule financiamentos com desdobramento mensal de capital e juros"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setMonto(values.monto as string)
              setTasaAnual(values.tasaAnual as string)
              setPlazoAnos(values.plazoAnos as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="monto">Valor do Financiamento (R$)</Label>
                  <Input
                    id="monto"
                    type="number"
                    step="0.01"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    placeholder="Ex: 200000"
                  />
                </div>
                <div>
                  <Label htmlFor="tasaAnual">Taxa de Juros Anual (%)</Label>
                  <Input
                    id="tasaAnual"
                    type="number"
                    step="0.01"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(e.target.value)}
                    placeholder="Ex: 8"
                  />
                </div>
                <div>
                  <Label htmlFor="plazoAnos">Prazo (anos)</Label>
                  <Input
                    id="plazoAnos"
                    type="number"
                    step="0.1"
                    value={plazoAnos}
                    onChange={(e) => setPlazoAnos(e.target.value)}
                    placeholder="Ex: 20"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Financiamento
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
                      <Home className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Parcela Mensal</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          R$ {results.cuotaMensual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Total de Juros</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">
                          R$ {results.totalIntereses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Total</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {results.totalPagos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Número de Parcelas</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {results.plazoAnos * 12} parcelas
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Taxa de juros:</strong> {tasaAnual}% ao ano
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Prazo:</strong> {plazoAnos} {plazoAnos === '1' ? 'ano' : 'anos'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Valor financiado:</strong> R$ {parseFloat(monto).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Método:</strong> Sistema de Amortização Francês (Tabela Price)
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
