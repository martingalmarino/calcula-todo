"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Fuel, AlertCircle } from 'lucide-react'
import { calculateGasExpense, type GasExpenseResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function GastoGasolinaClient() {
  const [distance, setDistance] = useState('')
  const [consumption, setConsumption] = useState('')
  const [pricePerLiter, setPricePerLiter] = useState('')
  const [results, setResults] = useState<GasExpenseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!distance || !consumption || !pricePerLiter) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const distanceNum = parseFloat(distance)
      const consumptionNum = parseFloat(consumption)
      const priceNum = parseFloat(pricePerLiter)
      
      if (isNaN(distanceNum) || isNaN(consumptionNum) || isNaN(priceNum)) {
        setError('Por favor, ingresa valores numéricos válidos')
        return
      }

      const result = calculateGasExpense(distanceNum, consumptionNum, priceNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular el gasto de gasolina')
    }
  }

  const breadcrumbs = getBreadcrumbs('/otras/gasto-gasolina')

  const examples = [
    {
      label: 'Ejemplo: 200km, 8L/100km, $1.50/L',
      values: { distance: '200', consumption: '8', pricePerLiter: '1.50' }
    },
    {
      label: 'Ejemplo: 500km, 6L/100km, $1.80/L',
      values: { distance: '500', consumption: '6', pricePerLiter: '1.80' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calcula el gasto de gasolina?',
      answer: 'Gasto = (Distancia × Consumo / 100) × Precio por litro. El consumo se expresa en litros por cada 100 kilómetros.'
    },
    {
      question: '¿Dónde encuentro el consumo de mi vehículo?',
      answer: 'Puedes encontrarlo en el manual del vehículo, en la pantalla del tablero, o calcularlo dividiendo los litros consumidos entre los kilómetros recorridos.'
    },
    {
      question: '¿El consumo varía según las condiciones?',
      answer: 'Sí, el consumo puede variar según el tráfico, velocidad, carga del vehículo, condiciones climáticas y estilo de conducción.'
    },
    {
      question: '¿Cómo puedo reducir el gasto de gasolina?',
      answer: 'Mantén una velocidad constante, evita aceleraciones bruscas, revisa la presión de los neumáticos y planifica rutas eficientes.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Gasto de Gasolina - Costo por Kilómetro',
            description: 'Calcula el costo de combustible por kilómetro y gasto total de gasolina',
            url: '/otras/gasto-gasolina/',
            category: 'Transporte'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Gasto de Gasolina - Costo por Kilómetro"
            description="Calcula el costo de combustible por kilómetro y gasto total de gasolina"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setDistance(values.distance as string)
              setConsumption(values.consumption as string)
              setPricePerLiter(values.pricePerLiter as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Calculadora de Gasto de Gasolina
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Distancia (km)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej: 200"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Consumo (L/100km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Ej: 8.5"
                      value={consumption}
                      onChange={(e) => setConsumption(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Precio por Litro ($)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Ej: 1.50"
                      value={pricePerLiter}
                      onChange={(e) => setPricePerLiter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Fuel className="h-4 w-4 mr-2" />
                  Calcular Gasto
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {results && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Resultado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            ${results.totalCost}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Gasto Total
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            ${results.costPerKm}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Por Kilómetro
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            {results.breakdown.consumption}L
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Litros Consumidos
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Desglose del Cálculo:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Distancia:</span>
                            <span className="font-medium">{results.breakdown.distance} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Consumo:</span>
                            <span className="font-medium">{results.breakdown.consumption} litros</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Precio por litro:</span>
                            <span className="font-medium">${results.costPerLiter}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-medium">
                            <span>Gasto total:</span>
                            <span>${results.totalCost}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
