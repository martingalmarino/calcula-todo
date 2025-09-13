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
import { Fuel, Calculator } from 'lucide-react'
import { calculateGasExpense, type GasExpenseResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function GastoGasolinaClientPT() {
  const [distance, setDistance] = useState('')
  const [consumption, setConsumption] = useState('')
  const [pricePerLiter, setPricePerLiter] = useState('')
  const [results, setResults] = useState<GasExpenseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!distance || !consumption || !pricePerLiter) {
      setError('Por favor, preencha todos os campos')
      return
    }

    try {
      const distanceNum = parseFloat(distance)
      const consumptionNum = parseFloat(consumption)
      const priceNum = parseFloat(pricePerLiter)
      
      if (isNaN(distanceNum) || isNaN(consumptionNum) || isNaN(priceNum)) {
        setError('Por favor, digite valores numéricos válidos')
        return
      }

      if (distanceNum <= 0 || consumptionNum <= 0 || priceNum <= 0) {
        setError('Todos os valores devem ser maiores que zero')
        return
      }

      const result = calculateGasExpense(distanceNum, consumptionNum, priceNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular o gasto de gasolina')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Outras', href: '/pt/outras/' },
    { label: 'Gasto de Gasolina', href: '/pt/outras/gasto-gasolina/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 300km, 12km/l, R$ 5.50/l',
      values: { distance: '300', consumption: '12', pricePerLiter: '5.50' }
    },
    {
      label: 'Exemplo: 150km, 15km/l, R$ 6.00/l',
      values: { distance: '150', consumption: '15', pricePerLiter: '6.00' }
    },
    {
      label: 'Exemplo: 500km, 10km/l, R$ 5.80/l',
      values: { distance: '500', consumption: '10', pricePerLiter: '5.80' }
    }
  ]

  const faqItems = [
    {
      question: 'Como calcular o consumo de combustível?',
      answer: 'O consumo é medido em km/l (quilômetros por litro). Você pode calcular dividindo a distância percorrida pela quantidade de combustível consumida.'
    },
    {
      question: 'O que inclui o custo total?',
      answer: 'O custo total inclui apenas o gasto com combustível. Não inclui pedágios, alimentação, hospedagem ou outros custos da viagem.'
    },
    {
      question: 'Como obter o preço atual da gasolina?',
      answer: 'Você pode consultar postos de gasolina locais, aplicativos de preços de combustível ou sites especializados em preços de gasolina.'
    },
    {
      question: 'O consumo varia com o tipo de veículo?',
      answer: 'Sim, o consumo varia muito entre carros, motos, caminhões e outros veículos. Consulte o manual do seu veículo ou faça testes práticos.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Porcentagens',
      href: '/pt/matematicas/porcentajes/'
    },
    {
      label: 'Calculadora de Finanças',
      href: '/pt/financas/'
    },
    {
      label: 'Outras Calculadoras',
      href: '/pt/outras/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Gasto de Gasolina em Viagem',
            description: 'Calcula o custo total de combustível para viagens baseado na distância, consumo e preço da gasolina',
            url: '/pt/outras/gasto-gasolina/',
            category: 'Viagem'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Gasto de Gasolina em Viagem"
            description="Calcula o custo total de combustível para viagens baseado na distância, consumo e preço da gasolina"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setDistance(values.distance as string)
              setConsumption(values.consumption as string)
              setPricePerLiter(values.pricePerLiter as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="distance">Distância (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Ex: 300"
                  />
                </div>
                <div>
                  <Label htmlFor="consumption">Consumo (km/l)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="Ex: 12"
                  />
                </div>
                <div>
                  <Label htmlFor="pricePerLiter">Preço por Litro (R$)</Label>
                  <Input
                    id="pricePerLiter"
                    type="number"
                    step="0.01"
                    value={pricePerLiter}
                    onChange={(e) => setPricePerLiter(e.target.value)}
                    placeholder="Ex: 5.50"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Gasto de Gasolina
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
                      <Fuel className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Fuel className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Custo Total</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">R$ {results.totalCost.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Fuel className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Custo por km</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">R$ {results.costPerKm.toFixed(3)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Fuel className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Litros Necessários</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{results.breakdown.consumption.toFixed(1)}L</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Distância:</strong> {results.breakdown.distance} km
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Consumo:</strong> {consumption} km/l
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Preço por litro:</strong> R$ {results.costPerLiter.toFixed(2)}
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
