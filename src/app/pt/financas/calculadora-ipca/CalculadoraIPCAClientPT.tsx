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
import { calcularIPC } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalculadoraIPCAClientPT() {
  const [valorInicial, setValorInicial] = useState('')
  const [ipcaAnual, setIpcaAnual] = useState('')
  const [anos, setAnos] = useState('')
  const [results, setResults] = useState<{
    monto: number;
    ipcInicial: number;
    ipcFinal: number;
    variacionIPC: number;
    poderAdquisitivo: number;
    perdidaPoderAdquisitivo: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!valorInicial || !ipcaAnual || !anos) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const valorInicialNum = parseFloat(valorInicial)
      const ipcaAnualNum = parseFloat(ipcaAnual)
      const anosNum = parseFloat(anos)
      
      if (isNaN(valorInicialNum) || valorInicialNum <= 0) {
        setError('Por favor, digite um valor inicial válido maior que zero')
        return
      }

      if (isNaN(ipcaAnualNum) || ipcaAnualNum <= 0) {
        setError('Por favor, digite uma taxa de IPCA válida maior que zero')
        return
      }

      if (isNaN(anosNum) || anosNum <= 0) {
        setError('Por favor, digite um número de anos válido maior que zero')
        return
      }

      const ipcInicial = 100 // IPC base
      const ipcFinal = ipcInicial * Math.pow(1 + ipcaAnualNum / 100, anosNum)
      const result = calcularIPC(valorInicialNum, ipcInicial, ipcFinal)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular o IPCA')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Finanças', href: '/pt/financas/' },
    { label: 'Calculadora do IPCA', href: '/pt/financas/calculadora-ipca/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 1.000, 5% ao ano, 10 anos',
      values: { valorInicial: '1000', ipcaAnual: '5', anos: '10' }
    },
    {
      label: 'Exemplo: R$ 5.000, 3% ao ano, 5 anos',
      values: { valorInicial: '5000', ipcaAnual: '3', anos: '5' }
    },
    {
      label: 'Exemplo: R$ 10.000, 4% ao ano, 20 anos',
      values: { valorInicial: '10000', ipcaAnual: '4', anos: '20' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é o IPCA?',
      answer: 'O Índice Nacional de Preços ao Consumidor Amplo (IPCA) é o índice oficial de inflação do Brasil, medido pelo IBGE. É usado como referência para metas de inflação e correção de valores.'
    },
    {
      question: 'Como o IPCA afeta o poder de compra?',
      answer: 'O IPCA mede a inflação, que é o aumento geral dos preços. Com inflação, o mesmo valor de dinheiro compra menos produtos e serviços ao longo do tempo.'
    },
    {
      question: 'Por que é importante calcular o impacto da inflação?',
      answer: 'Calcular o impacto da inflação ajuda no planejamento financeiro, investimentos e a entender o valor real do dinheiro ao longo do tempo.'
    },
    {
      question: 'Como usar esta calculadora?',
      answer: 'Digite o valor inicial, a taxa anual de IPCA e o número de anos. A calculadora mostrará quanto esse valor valeria hoje e a perda de poder de compra.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Valor Futuro e Presente',
      href: '/pt/financas/valor-futuro-presente/'
    },
    {
      label: 'Poupança Objetivo',
      href: '/pt/financas/poupanca-objetivo/'
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
            name: 'Calculadora do IPCA',
            description: 'Calcule o impacto da inflação no poder de compra do dinheiro',
            url: '/pt/financas/calculadora-ipca/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora do IPCA"
            description="Calcule o impacto da inflação no poder de compra do dinheiro"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setValorInicial(values.valorInicial as string)
              setIpcaAnual(values.ipcaAnual as string)
              setAnos(values.anos as string)
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
                    placeholder="Ex: 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="ipcaAnual">Taxa de IPCA Anual (%)</Label>
                  <Input
                    id="ipcaAnual"
                    type="number"
                    step="0.01"
                    value={ipcaAnual}
                    onChange={(e) => setIpcaAnual(e.target.value)}
                    placeholder="Ex: 5"
                  />
                </div>
                <div>
                  <Label htmlFor="anos">Número de Anos</Label>
                  <Input
                    id="anos"
                    type="number"
                    step="0.1"
                    value={anos}
                    onChange={(e) => setAnos(e.target.value)}
                    placeholder="Ex: 10"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular IPCA
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
                      <DollarSign className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Inicial</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          R$ {results.monto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Atual</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {results.poderAdquisitivo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Perda de Poder de Compra</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">
                          {((results.perdidaPoderAdquisitivo / results.monto) * 100).toFixed(2)}%
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Inflação Acumulada</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {results.variacionIPC.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Taxa de IPCA:</strong> {ipcaAnual}% ao ano
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Período:</strong> {anos} {anos === '1' ? 'ano' : 'anos'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Interpretação:</strong> R$ {results.monto.toLocaleString('pt-BR')} de {new Date().getFullYear() - parseInt(anos)} compraria o equivalente a R$ {results.poderAdquisitivo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} hoje.
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
