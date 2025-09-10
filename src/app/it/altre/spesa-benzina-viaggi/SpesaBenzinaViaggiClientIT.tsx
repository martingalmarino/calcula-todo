"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Fuel, AlertCircle, MapPin, Gauge, Euro } from 'lucide-react'
import { calculateGasExpense, type GasExpenseResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function SpesaBenzinaViaggiClientIT() {
  const [distance, setDistance] = useState('')
  const [consumption, setConsumption] = useState('')
  const [pricePerLiter, setPricePerLiter] = useState('')
  const [results, setResults] = useState<GasExpenseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!distance || !consumption || !pricePerLiter) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    try {
      const distanceNum = parseFloat(distance)
      const consumptionNum = parseFloat(consumption)
      const priceNum = parseFloat(pricePerLiter)
      
      if (isNaN(distanceNum) || isNaN(consumptionNum) || isNaN(priceNum)) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = calculateGasExpense(distanceNum, consumptionNum, priceNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo della spesa')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Altre Calcolatrici', href: '/it/altre' },
    { label: 'Spesa Benzina per Viaggi', href: '/it/altre/spesa-benzina-viaggi' }
  ]

  const examples = [
    {
      label: 'Viaggio di 200 km con consumo 7L/100km a €1.50/L',
      values: { distance: '200', consumption: '7', pricePerLiter: '1.50' }
    },
    {
      label: 'Viaggio di 500 km con consumo 8L/100km a €1.60/L',
      values: { distance: '500', consumption: '8', pricePerLiter: '1.60' }
    }
  ]

  const faqItems = [
    {
      question: 'Come calcolo il consumo del mio veicolo?',
      answer: 'Il consumo si misura in litri per 100 km. Puoi trovarlo nel manuale del veicolo o calcolarlo dividendo i litri consumati per la distanza percorsa.'
    },
    {
      question: 'Il calcolo include altri costi del viaggio?',
      answer: 'No, questo calcolo include solo il costo del carburante. Non include pedaggi, parcheggi o altri costi del viaggio.'
    },
    {
      question: 'Posso usare questo calcolo per viaggi di andata e ritorno?',
      answer: 'Sì, basta moltiplicare la distanza per 2 per calcolare il costo totale del viaggio di andata e ritorno.'
    },
    {
      question: 'Come posso ridurre i costi del carburante?',
      answer: 'Guidare a velocità costante, evitare accelerazioni brusche, mantenere i pneumatici gonfi e ridurre il peso del veicolo possono aiutare a ridurre il consumo.'
    }
  ]

  const relatedLinks = [
    { label: 'Scala di Voti', href: '/it/altre/scala-di-voti', description: 'Converte punteggi in lettere' },
    { label: 'Contatore di Parole', href: '/it/altre/contatore-parole-caratteri', description: 'Conta parole e caratteri' },
    { label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance', description: 'Calcola le mance' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Spesa Benzina per Viaggi',
            description: 'Calcola il costo del carburante per i tuoi viaggi',
            url: '/it/altre/spesa-benzina-viaggi/',
            category: 'Viaggi'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Spesa Benzina per Viaggi"
            description="Calcola il costo del carburante per i tuoi viaggi"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
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
                  Calcolatrice Spesa Benzina
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Distanza (km)
                    </label>
                    <Input
                      type="number"
                      placeholder="Es: 200"
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
                      placeholder="Es: 7"
                      value={consumption}
                      onChange={(e) => setConsumption(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Prezzo per Litro (€)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 1.50"
                      value={pricePerLiter}
                      onChange={(e) => setPricePerLiter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Fuel className="h-4 w-4 mr-2" />
                  Calcola Spesa
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
                      <CardTitle className="text-lg">Risultato del Calcolo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          €{results.totalCost.toFixed(2)}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          Costo Totale del Viaggio
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Costo per km</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            €{results.costPerKm.toFixed(3)}
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Gauge className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Litri Consumati</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {results.breakdown.consumption}L
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Euro className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Prezzo per Litro</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">
                            €{results.costPerLiter.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Calcolo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Distanza:</span>
                            <span className="font-medium">{results.breakdown.distance} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Consumo:</span>
                            <span className="font-medium">{consumption} L/100km</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Litri Consumati:</span>
                            <span className="font-medium">{results.breakdown.consumption}L</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Costo Totale:</span>
                            <span className="font-medium">€{results.totalCost.toFixed(2)}</span>
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
