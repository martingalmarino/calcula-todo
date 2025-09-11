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
import { Target, Calculator } from 'lucide-react'
import { calcularAhorroObjetivo } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function PoupancaObjetivoClientPT() {
  const [meta, setMeta] = useState('')
  const [tasaAnual, setTasaAnual] = useState('')
  const [anos, setAnos] = useState('')
  const [results, setResults] = useState<{
    objetivo: number;
    tasaAnual: number;
    plazoAnos: number;
    ahorroMensual: number;
    totalAhorrado: number;
    interesesGanados: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!meta || !tasaAnual || !anos) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const metaNum = parseFloat(meta)
      const tasaAnualNum = parseFloat(tasaAnual)
      const anosNum = parseFloat(anos)
      
      if (isNaN(metaNum) || metaNum <= 0) {
        setError('Por favor, digite uma meta válida maior que zero')
        return
      }

      if (isNaN(tasaAnualNum) || tasaAnualNum < 0) {
        setError('Por favor, digite uma taxa de juros válida maior ou igual a zero')
        return
      }

      if (isNaN(anosNum) || anosNum <= 0) {
        setError('Por favor, digite um número de anos válido maior que zero')
        return
      }

      const result = calcularAhorroObjetivo(metaNum, tasaAnualNum / 100, anosNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a poupança')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Finanças', href: '/pt/financas/' },
    { label: 'Poupança Objetivo', href: '/pt/financas/poupanca-objetivo/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 50.000, 6% ao ano, 5 anos',
      values: { meta: '50000', tasaAnual: '6', anos: '5' }
    },
    {
      label: 'Exemplo: R$ 100.000, 8% ao ano, 10 anos',
      values: { meta: '100000', tasaAnual: '8', anos: '10' }
    },
    {
      label: 'Exemplo: R$ 25.000, 4% ao ano, 3 anos',
      values: { meta: '25000', tasaAnual: '4', anos: '3' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é poupança objetivo?',
      answer: 'É uma estratégia de poupança onde você define uma meta financeira específica e calcula quanto precisa poupar mensalmente para alcançá-la em um tempo determinado.'
    },
    {
      question: 'Como funciona o cálculo?',
      answer: 'O cálculo considera a meta desejada, a taxa de juros esperada e o tempo disponível. Usa juros compostos para determinar o valor mensal necessário.'
    },
    {
      question: 'Qual taxa de juros usar?',
      answer: 'Use a taxa de juros esperada do seu investimento. Para poupança tradicional, use cerca de 6% ao ano. Para investimentos mais arriscados, pode ser maior.'
    },
    {
      question: 'Como aumentar minhas chances de sucesso?',
      answer: 'Seja realista com a meta e o tempo, considere inflação, revise periodicamente e ajuste se necessário. Automatize os depósitos quando possível.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Valor Futuro e Presente',
      href: '/pt/financas/valor-futuro-presente/'
    },
    {
      label: 'Calculadora do IPCA',
      href: '/pt/financas/calculadora-ipca/'
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
            name: 'Calculadora de Poupança Objetivo',
            description: 'Calcule quanto poupar mensalmente para alcançar uma meta financeira',
            url: '/pt/financas/poupanca-objetivo/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Poupança Objetivo"
            description="Calcule quanto poupar mensalmente para alcançar uma meta financeira"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setMeta(values.meta as string)
              setTasaAnual(values.tasaAnual as string)
              setAnos(values.anos as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="meta">Meta Financeira (R$)</Label>
                  <Input
                    id="meta"
                    type="number"
                    step="0.01"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    placeholder="Ex: 50000"
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
                    placeholder="Ex: 6"
                  />
                </div>
                <div>
                  <Label htmlFor="anos">Tempo (anos)</Label>
                  <Input
                    id="anos"
                    type="number"
                    step="0.1"
                    value={anos}
                    onChange={(e) => setAnos(e.target.value)}
                    placeholder="Ex: 5"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Poupança
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
                      <Target className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Poupança Mensal</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {results.ahorroMensual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Total Poupado</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          R$ {results.totalAhorrado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Juros Ganhos</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          R$ {results.interesesGanados.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Final</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          R$ {results.objetivo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Meta:</strong> R$ {parseFloat(meta).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Taxa de juros:</strong> {tasaAnual}% ao ano
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Tempo:</strong> {anos} {anos === '1' ? 'ano' : 'anos'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Número de depósitos:</strong> {results.plazoAnos * 12} depósitos mensais
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
