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
import { Calculator, Coffee, DollarSign, TrendingUp } from 'lucide-react'
import { calcularAhorroCafe } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function KaffeeSparRechnerClientDE() {
  const [precioCafe, setPrecioCafe] = useState<string>('')
  const [años, setAños] = useState<string>('')
  const [tasaInteres, setTasaInteres] = useState<string>('5')
  const [resultado, setResultado] = useState<{
    precioCafe: number
    años: number
    tasaInteres: number
    ahorroDiario: number
    ahorroAnual: number
    ahorroTotal: number
    ahorroSinInteres: number
    gananciaInteres: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const precioNum = parseFloat(precioCafe)
    const añosNum = parseFloat(años)
    const tasaNum = parseFloat(tasaInteres)

    if (isNaN(precioNum) || isNaN(añosNum) || isNaN(tasaNum)) {
      setError('Bitte geben Sie gültige Zahlenwerte für alle Felder ein.')
      return
    }

    if (precioNum <= 0 || añosNum <= 0 || tasaNum < 0) {
      setError('Der Kaffeepreis und die Jahre müssen positiv sein. Der Zinssatz kann nicht negativ sein.')
      return
    }

    if (añosNum > 100) {
      setError('Die Jahre können nicht größer als 100 sein.')
      return
    }

    if (tasaNum > 50) {
      setError('Der Zinssatz kann nicht größer als 50% sein.')
      return
    }

    try {
      const resultado = calcularAhorroCafe(precioNum, añosNum, tasaNum)
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen der Ersparnis. Überprüfen Sie die eingegebenen Werte.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setPrecioCafe(values.precioCafe as string)
    setAños(values.años as string)
    setTasaInteres(values.tasaInteres as string)
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/kurioses/kaffee-spar')

  const examples = [
    {
      label: 'Starbucks Kaffee: 5€ täglich, 20 Jahre, 5% Zinsen',
      values: { precioCafe: '5', años: '20', tasaInteres: '5' }
    },
    {
      label: 'Lokaler Kaffee: 3€ täglich, 10 Jahre, 7% Zinsen',
      values: { precioCafe: '3', años: '10', tasaInteres: '7' }
    },
    {
      label: 'Premium Kaffee: 8€ täglich, 30 Jahre, 4% Zinsen',
      values: { precioCafe: '8', años: '30', tasaInteres: '4' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie funktioniert der Zinseszins in dieser Berechnung?',
      answer: 'Der Zinseszins bedeutet, dass die verdienten Zinsen auch Zinsen generieren. Jeden Monat wird das gesparte Geld investiert und generiert mehr Geld, was einen "Schneeball-Effekt" schafft, der die Ersparnis langfristig erheblich multipliziert.'
    },
    {
      question: 'Welcher Zinssatz ist realistisch?',
      answer: 'Ein Zinssatz von 5-7% jährlich ist realistisch für konservative Investitionen wie Indexfonds oder hochverzinsliche Sparkonten. Die Zinssätze können je nach Art der Investition und Marktbedingungen variieren.'
    },
    {
      question: 'Lohnt es sich wirklich, auf Kaffee zu verzichten?',
      answer: 'Dieser Rechner dient Bildungszwecken. Kaffee kann eine wichtige kleine tägliche Freude sein. Der Schlüssel ist, ein Gleichgewicht zwischen dem Genießen des Lebens und dem Sparen für die Zukunft zu finden.'
    },
    {
      question: 'Welche anderen kleinen Ausgaben kann ich analysieren?',
      answer: 'Sie können das gleiche Konzept auf andere tägliche Ausgaben wie Snacks, Softdrinks, Zigaretten oder jede kleine regelmäßige Einkauf anwenden. Jeder Euro zählt, wenn er langfristig investiert wird.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Kaffee-Spar-Rechner',
            description: 'Berechnen Sie, wie viel Sie sparen könnten, wenn Sie auf täglichen Kaffee verzichten',
            url: '/de/kurioses/kaffee-spar/',
            category: 'Kurioses'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Kaffee-Spar-Rechner"
            description="Entdecken Sie, wie viel Geld Sie sparen könnten, wenn Sie auf täglichen Kaffee verzichten. Der Zinseszins kann Sie überraschen."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="precioCafe">Kaffeepreis pro Tag (€)</Label>
                <Input
                  id="precioCafe"
                  type="number"
                  step="0.01"
                  value={precioCafe}
                  onChange={(e) => setPrecioCafe(e.target.value)}
                  placeholder="z.B. 5.00"
                />
              </div>
              
              <div>
                <Label htmlFor="años">Anzahl der Jahre</Label>
                <Input
                  id="años"
                  type="number"
                  value={años}
                  onChange={(e) => setAños(e.target.value)}
                  placeholder="z.B. 20"
                />
              </div>
              
              <div>
                <Label htmlFor="tasaInteres">Jährlicher Zinssatz (%)</Label>
                <Input
                  id="tasaInteres"
                  type="number"
                  step="0.1"
                  value={tasaInteres}
                  onChange={(e) => setTasaInteres(e.target.value)}
                  placeholder="z.B. 5.0"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Empfohlen: 5-7% für konservative Investitionen
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Ersparnis berechnen
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
                      <Coffee className="h-5 w-5" />
                      Ergebnisse der Ersparnis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Täglicher Kaffee</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.precioCafe.toFixed(2)}€</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Jährliche Ersparnis</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.ahorroAnual.toLocaleString()}€</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Zinssatz</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.tasaInteres}%</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Ersparnis ohne Zinsen</p>
                            <p className="text-3xl font-bold text-blue-600">{resultado.ahorroSinInteres.toLocaleString()}€</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Gewinn durch Zinsen</p>
                            <p className="text-3xl font-bold text-green-600">{resultado.gananciaInteres.toLocaleString()}€</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border-2 border-green-300 mt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Gesamtersparnis mit Zinseszins</p>
                          <p className="text-4xl font-bold text-green-600">{resultado.ahorroTotal.toLocaleString()}€</p>
                          <p className="text-sm text-gray-500 mt-2">in {resultado.años} Jahren</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Überraschende Fakten</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Multiplikator:</strong> Der Zinseszins multiplizierte Ihre Ersparnis um {(resultado.ahorroTotal / resultado.ahorroSinInteres).toFixed(1)}x</p>
                        <p>• <strong>Extra-Gewinn:</strong> Sie verdienten {resultado.gananciaInteres.toLocaleString()}€ nur durch das Investieren des Geldes</p>
                        <p>• <strong>Äquivalenz:</strong> Mit diesem Geld könnten Sie {(resultado.ahorroTotal / resultado.precioCafe).toLocaleString()} Kaffees kaufen</p>
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
