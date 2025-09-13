"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Receipt, Users, DollarSign, Percent } from 'lucide-react'
import { calculateTip, type TipCalculationResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function TrinkgeldRechnerClientDE() {
  const [billAmount, setBillAmount] = useState<string>('')
  const [tipPercentage, setTipPercentage] = useState<string>('')
  const [peopleCount, setPeopleCount] = useState<string>('1')
  const [resultado, setResultado] = useState<TipCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const billNum = parseFloat(billAmount)
    const tipNum = parseFloat(tipPercentage)
    const peopleNum = parseFloat(peopleCount)

    if (isNaN(billNum) || isNaN(tipNum) || isNaN(peopleNum)) {
      setError('Bitte geben Sie gültige Zahlenwerte ein.')
      return
    }

    if (billNum <= 0) {
      setError('Der Rechnungsbetrag muss größer als 0 sein.')
      return
    }

    if (tipNum < 0 || tipNum > 100) {
      setError('Der Trinkgeld-Prozentsatz muss zwischen 0 und 100 liegen.')
      return
    }

    if (peopleNum <= 0 || peopleNum > 50) {
      setError('Die Anzahl der Personen muss zwischen 1 und 50 liegen.')
      return
    }

    try {
      const resultado = calculateTip(billNum, tipNum, peopleNum)
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen des Trinkgelds. Überprüfen Sie die eingegebenen Werte.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setBillAmount(values.billAmount as string)
    setTipPercentage(values.tipPercentage as string)
    setPeopleCount(values.peopleCount as string)
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/andere/trinkgeld')

  const examples = [
    {
      label: 'Rechnung 50€, 15% Trinkgeld, 2 Personen',
      values: { billAmount: '50', tipPercentage: '15', peopleCount: '2' }
    },
    {
      label: 'Rechnung 120€, 18% Trinkgeld, 4 Personen',
      values: { billAmount: '120', tipPercentage: '18', peopleCount: '4' }
    },
    {
      label: 'Rechnung 25€, 20% Trinkgeld, 1 Person',
      values: { billAmount: '25', tipPercentage: '20', peopleCount: '1' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie hoch ist der Standard-Trinkgeld-Prozentsatz?',
      answer: 'In den meisten Ländern: 15-18% für Standard-Service, 18-20% für guten Service, 20%+ für exzellenten Service. In Deutschland ist Trinkgeld oft optional.'
    },
    {
      question: 'Wie wird das Trinkgeld berechnet?',
      answer: 'Das Trinkgeld wird berechnet, indem der Rechnungsbetrag mit dem Trinkgeld-Prozentsatz multipliziert und durch 100 geteilt wird. Dann wird es zum ursprünglichen Betrag addiert.'
    },
    {
      question: 'Soll ich Steuern in die Berechnung einbeziehen?',
      answer: 'Normalerweise wird das Trinkgeld auf den Betrag vor Steuern berechnet, aber dies kann je nach Land und lokalen Gepflogenheiten variieren.'
    },
    {
      question: 'Was tun, wenn der Service schlecht war?',
      answer: 'Wenn der Service wirklich schlecht war, können Sie weniger Trinkgeld geben (5-10%) oder mit dem Manager sprechen. Trinkgeld ist eine Belohnung für guten Service.'
    }
  ]

  const quickTipOptions = [
    { label: '10% (Grundservice)', value: '10' },
    { label: '15% (Standard-Service)', value: '15' },
    { label: '18% (Guter Service)', value: '18' },
    { label: '20% (Exzellenter Service)', value: '20' },
    { label: '25% (Außergewöhnlicher Service)', value: '25' }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Trinkgeld-Rechner',
            description: 'Berechnen Sie Trinkgeld einfach und teilen Sie die Rechnung zwischen mehreren Personen',
            url: '/de/andere/trinkgeld/',
            category: 'Gastronomie'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Trinkgeld-Rechner"
            description="Berechnen Sie Trinkgeld einfach und teilen Sie die Rechnung zwischen mehreren Personen. Inklusive Standard-Prozentsätze und Berechnung pro Person."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="billAmount">Rechnungsbetrag (€)</Label>
                <Input
                  id="billAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="z.B. 50.00"
                />
              </div>
              
              <div>
                <Label htmlFor="tipPercentage">Trinkgeld-Prozentsatz (%)</Label>
                <Select value={tipPercentage} onValueChange={setTipPercentage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie oder geben Sie manuell ein" />
                  </SelectTrigger>
                  <SelectContent>
                    {quickTipOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="tipPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={tipPercentage}
                  onChange={(e) => setTipPercentage(e.target.value)}
                  placeholder="z.B. 18"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="peopleCount">Anzahl der Personen</Label>
                <Input
                  id="peopleCount"
                  type="number"
                  min="1"
                  max="50"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.target.value)}
                  placeholder="z.B. 2"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Trinkgeld berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      Trinkgeld-Ergebnis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ursprüngliche Rechnung</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.billAmount}€</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Trinkgeld ({resultado.tipPercentage}%)</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{resultado.tipAmount}€</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Personen</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.peopleCount}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Gesamt zu zahlen</p>
                          <p className="text-3xl font-bold text-green-600">{resultado.totalAmount}€</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Pro Person</p>
                          <p className="text-3xl font-bold text-blue-600">{resultado.perPersonAmount}€</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💰 Aufschlüsselung</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Ursprüngliche Rechnung:</strong> {resultado.breakdown.bill}€</p>
                        <p>• <strong>Trinkgeld ({resultado.tipPercentage}%):</strong> {resultado.breakdown.tip}€</p>
                        <p>• <strong>Gesamt:</strong> {resultado.breakdown.total}€</p>
                        {resultado.peopleCount > 1 && (
                          <p>• <strong>Pro Person:</strong> {resultado.perPersonAmount}€</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Trinkgeld-Tipps</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Grundservice:</strong> 10-15%</p>
                        <p>• <strong>Standard-Service:</strong> 15-18%</p>
                        <p>• <strong>Guter Service:</strong> 18-20%</p>
                        <p>• <strong>Exzellenter Service:</strong> 20%+</p>
                        <p>• <strong>Beachten Sie:</strong> Servicequalität, Land und lokale Gepflogenheiten</p>
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
