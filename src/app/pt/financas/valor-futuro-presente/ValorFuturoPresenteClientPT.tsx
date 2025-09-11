"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DollarSign, Calculator } from 'lucide-react'
import { calcularValorFuturo, calcularValorPresente } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function ValorFuturoPresenteClientPT() {
  const [valor, setValor] = useState('')
  const [tasaAnual, setTasaAnual] = useState('')
  const [anos, setAnos] = useState('')
  const [tipo, setTipo] = useState('futuro')
  const [results, setResults] = useState<{
    valorInicial: number;
    valorFinal: number;
    intereses: number;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!valor || !tasaAnual || !anos) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const valorNum = parseFloat(valor)
      const tasaAnualNum = parseFloat(tasaAnual)
      const anosNum = parseFloat(anos)
      
      if (isNaN(valorNum) || valorNum <= 0) {
        setError('Por favor, digite um valor válido maior que zero')
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

      let valorFinal: number
      if (tipo === 'futuro') {
        valorFinal = calcularValorFuturo(valorNum, tasaAnualNum / 100, anosNum)
      } else {
        valorFinal = calcularValorPresente(valorNum, tasaAnualNum / 100, anosNum)
      }
      
      const result = {
        valorInicial: valorNum,
        valorFinal: valorFinal,
        intereses: Math.abs(valorFinal - valorNum)
      }
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular o valor')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Finanças', href: '/pt/financas/' },
    { label: 'Valor Futuro e Presente', href: '/pt/financas/valor-futuro-presente/' }
  ]

  const examples = [
    {
      label: 'Exemplo: R$ 1.000, 8% ao ano, 10 anos (Futuro)',
      values: { valor: '1000', tasaAnual: '8', anos: '10', tipo: 'futuro' }
    },
    {
      label: 'Exemplo: R$ 5.000, 6% ao ano, 5 anos (Presente)',
      values: { valor: '5000', tasaAnual: '6', anos: '5', tipo: 'presente' }
    },
    {
      label: 'Exemplo: R$ 10.000, 10% ao ano, 15 anos (Futuro)',
      values: { valor: '10000', tasaAnual: '10', anos: '15', tipo: 'futuro' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é valor futuro?',
      answer: 'O valor futuro é quanto um investimento atual valerá em uma data futura, considerando uma taxa de juros específica e juros compostos.'
    },
    {
      question: 'O que é valor presente?',
      answer: 'O valor presente é o valor atual de um montante futuro, considerando uma taxa de desconto. É o inverso do valor futuro.'
    },
    {
      question: 'Qual a diferença entre valor futuro e presente?',
      answer: 'Valor futuro projeta um valor atual para o futuro, enquanto valor presente traz um valor futuro para o presente, ambos considerando juros compostos.'
    },
    {
      question: 'Como usar esta calculadora?',
      answer: 'Escolha o tipo de cálculo (futuro ou presente), digite o valor, taxa de juros e tempo. A calculadora mostrará o resultado usando juros compostos.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Poupança Objetivo',
      href: '/pt/financas/poupanca-objetivo/'
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
            name: 'Calculadora de Valor Futuro e Presente',
            description: 'Calcule valor futuro e presente de investimentos com juros compostos',
            url: '/pt/financas/valor-futuro-presente/',
            category: 'Finanças'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Valor Futuro e Presente"
            description="Calcule valor futuro e presente de investimentos com juros compostos"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setValor(values.valor as string)
              setTasaAnual(values.tasaAnual as string)
              setAnos(values.anos as string)
              setTipo(values.tipo as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo de Cálculo</Label>
                  <Select value={tipo} onValueChange={setTipo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="futuro">Valor Futuro</SelectItem>
                      <SelectItem value="presente">Valor Presente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valor">
                    {tipo === 'futuro' ? 'Valor Atual (R$)' : 'Valor Futuro (R$)'}
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder={tipo === 'futuro' ? 'Ex: 1000' : 'Ex: 5000'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="anos">Tempo (anos)</Label>
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
                  Calcular {tipo === 'futuro' ? 'Valor Futuro' : 'Valor Presente'}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-indigo-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {tipo === 'futuro' ? 'Valor Atual' : 'Valor Futuro'}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          R$ {results.valorInicial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {tipo === 'futuro' ? 'Valor Futuro' : 'Valor Presente'}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {results.valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Juros Ganhos/Descontados</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        R$ {results.intereses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Tipo:</strong> {tipo === 'futuro' ? 'Valor Futuro' : 'Valor Presente'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Taxa de juros:</strong> {tasaAnual}% ao ano
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Tempo:</strong> {anos} {anos === '1' ? 'ano' : 'anos'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Fórmula:</strong> {tipo === 'futuro' 
                          ? `VF = VP × (1 + i)^n = R$ ${results.valorInicial.toLocaleString('pt-BR')} × (1 + ${tasaAnual}%)^${anos}`
                          : `VP = VF ÷ (1 + i)^n = R$ ${results.valorInicial.toLocaleString('pt-BR')} ÷ (1 + ${tasaAnual}%)^${anos}`
                        }
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
