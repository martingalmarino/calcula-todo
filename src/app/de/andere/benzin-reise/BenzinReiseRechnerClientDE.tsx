"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Fuel } from 'lucide-react'
import { calculateGasExpense, type GasExpenseResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function BenzinReiseRechnerClientDE() {
  const [distance, setDistance] = useState<string>('')
  const [consumption, setConsumption] = useState<string>('')
  const [pricePerLiter, setPricePerLiter] = useState<string>('')
  const [results, setResults] = useState<GasExpenseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResults(null)
    
    if (!distance || !consumption || !pricePerLiter) {
      setError('Bitte füllen Sie alle Felder aus')
      return
    }

    try {
      const distanceNum = parseFloat(distance)
      const consumptionNum = parseFloat(consumption)
      const priceNum = parseFloat(pricePerLiter)
      
      if (isNaN(distanceNum) || isNaN(consumptionNum) || isNaN(priceNum)) {
        setError('Bitte geben Sie gültige Zahlenwerte ein')
        return
      }

      if (distanceNum <= 0 || consumptionNum <= 0 || priceNum <= 0) {
        setError('Alle Werte müssen positiv sein')
        return
      }

      if (distanceNum > 10000) {
        setError('Die Entfernung kann nicht größer als 10.000 km sein')
        return
      }

      if (consumptionNum > 50) {
        setError('Der Verbrauch kann nicht größer als 50 L/100km sein')
        return
      }

      const result = calculateGasExpense(distanceNum, consumptionNum, priceNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Berechnen der Kraftstoffkosten')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setDistance(values.distance as string)
    setConsumption(values.consumption as string)
    setPricePerLiter(values.pricePerLiter as string)
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/andere/benzin-reise')

  const examples = [
    {
      label: 'Beispiel: 200km, 8L/100km, 1,50€/L',
      values: { distance: '200', consumption: '8', pricePerLiter: '1.50' }
    },
    {
      label: 'Beispiel: 500km, 6L/100km, 1,80€/L',
      values: { distance: '500', consumption: '6', pricePerLiter: '1.80' }
    },
    {
      label: 'Beispiel: 1000km, 7,5L/100km, 1,65€/L',
      values: { distance: '1000', consumption: '7.5', pricePerLiter: '1.65' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie werden die Kraftstoffkosten berechnet?',
      answer: 'Kosten = (Entfernung × Verbrauch / 100) × Preis pro Liter. Der Verbrauch wird in Litern pro 100 Kilometer angegeben.'
    },
    {
      question: 'Wo finde ich den Verbrauch meines Fahrzeugs?',
      answer: 'Sie finden ihn im Fahrzeughandbuch, auf dem Armaturenbrett oder können ihn berechnen, indem Sie die verbrauchten Liter durch die gefahrenen Kilometer teilen.'
    },
    {
      question: 'Variiert der Verbrauch je nach Bedingungen?',
      answer: 'Ja, der Verbrauch kann je nach Verkehr, Geschwindigkeit, Fahrzeugbeladung, Wetterbedingungen und Fahrstil variieren.'
    },
    {
      question: 'Wie kann ich Kraftstoffkosten reduzieren?',
      answer: 'Halten Sie eine konstante Geschwindigkeit, vermeiden Sie abrupte Beschleunigungen, überprüfen Sie den Reifendruck und planen Sie effiziente Routen.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Benzin-Reise-Rechner - Kraftstoffkosten berechnen',
            description: 'Berechnen Sie Kraftstoffkosten pro Kilometer und Gesamtausgaben für Ihre Reise',
            url: '/de/andere/benzin-reise/',
            category: 'Transport'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Benzin-Reise-Rechner - Kraftstoffkosten berechnen"
            description="Berechnen Sie Kraftstoffkosten pro Kilometer und Gesamtausgaben für Ihre Reise. Perfekt für Reiseplanung und Budgetierung."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="distance">Entfernung (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="z.B. 200"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="consumption">Verbrauch (L/100km)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    step="0.1"
                    placeholder="z.B. 8.5"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pricePerLiter">Preis pro Liter (€)</Label>
                  <Input
                    id="pricePerLiter"
                    type="number"
                    step="0.01"
                    placeholder="z.B. 1.50"
                    value={pricePerLiter}
                    onChange={(e) => setPricePerLiter(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Fuel className="h-4 w-4" />
                  Kraftstoffkosten berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <Fuel className="h-5 w-5" />
                      Kraftstoffkosten-Berechnung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {results.totalCost}€
                        </div>
                        <div className="text-sm text-gray-600">
                          Gesamtkosten
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {results.costPerKm}€
                        </div>
                        <div className="text-sm text-gray-600">
                          Pro Kilometer
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {results.breakdown.consumption}L
                        </div>
                        <div className="text-sm text-gray-600">
                          Liter verbraucht
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
                      <h4 className="font-medium mb-3 text-center">Berechnungsaufschlüsselung:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Entfernung:</span>
                          <span className="font-medium">{results.breakdown.distance} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verbrauch:</span>
                          <span className="font-medium">{results.breakdown.consumption} Liter</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Preis pro Liter:</span>
                          <span className="font-medium">{results.costPerLiter}€</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-medium">
                          <span>Gesamtkosten:</span>
                          <span>{results.totalCost}€</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">⛽ Kraftstoffspar-Tipps</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Gleichmäßige Geschwindigkeit:</strong> Vermeiden Sie häufiges Beschleunigen und Bremsen</p>
                        <p>• <strong>Reifendruck:</strong> Überprüfen Sie regelmäßig den Reifendruck</p>
                        <p>• <strong>Gewicht reduzieren:</strong> Entfernen Sie unnötiges Gewicht aus dem Fahrzeug</p>
                        <p>• <strong>Route planen:</strong> Wählen Sie die effizienteste Route</p>
                        <p>• <strong>Fahrstil:</strong> Fahren Sie vorausschauend und sanft</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
