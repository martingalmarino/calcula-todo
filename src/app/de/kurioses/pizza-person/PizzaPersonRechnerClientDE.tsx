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
import { Calculator, Pizza, Users, Utensils } from 'lucide-react'
import { calcularPizzasNecesarias } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function PizzaPersonRechnerClientDE() {
  const [personas, setPersonas] = useState<string>('')
  const [nivelHambre, setNivelHambre] = useState<string>('')
  const [tamañoPizza, setTamañoPizza] = useState<string>('')
  const [resultado, setResultado] = useState<{
    personas: number
    nivelHambre: number
    tamañoPizza: string
    porcionesNecesarias: number
    pizzasNecesarias: number
    porcionesPorPizza: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const personasNum = parseFloat(personas)
    const nivelHambreNum = parseFloat(nivelHambre)

    if (isNaN(personasNum) || isNaN(nivelHambreNum)) {
      setError('Bitte geben Sie gültige Zahlenwerte für Personen und Hunger ein.')
      return
    }

    if (personasNum <= 0) {
      setError('Die Anzahl der Personen muss positiv sein.')
      return
    }

    if (nivelHambreNum < 1 || nivelHambreNum > 5) {
      setError('Das Hungerniveau muss zwischen 1 und 5 liegen.')
      return
    }

    if (!tamañoPizza) {
      setError('Bitte wählen Sie eine Pizzagröße aus.')
      return
    }

    if (personasNum > 100) {
      setError('Die Anzahl der Personen kann nicht größer als 100 sein.')
      return
    }

    try {
      const resultado = calcularPizzasNecesarias(personasNum, nivelHambreNum, tamañoPizza)
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen der Pizzas. Überprüfen Sie die eingegebenen Werte.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setPersonas(values.personas as string)
    setNivelHambre(values.nivelHambre as string)
    setTamañoPizza(values.tamañoPizza as string)
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/kurioses/pizza-person')

  const examples = [
    {
      label: '4 Personen, mäßiger Hunger, große Pizza',
      values: { personas: '4', nivelHambre: '3', tamañoPizza: 'grande' }
    },
    {
      label: '8 Personen, viel Hunger, mittlere Pizza',
      values: { personas: '8', nivelHambre: '4', tamañoPizza: 'mediana' }
    },
    {
      label: '2 Personen, wenig Hunger, kleine Pizza',
      values: { personas: '2', nivelHambre: '2', tamañoPizza: 'pequeña' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie werden die Hungerniveaus definiert?',
      answer: '1=Wenig Hunger (1 Portion), 2=Normaler Hunger (1.5 Portionen), 3=Mäßiger Hunger (2 Portionen), 4=Viel Hunger (2.5 Portionen), 5=Sehr hungrig (3 Portionen).'
    },
    {
      question: 'Wie viele Portionen hat jede Pizzagröße?',
      answer: 'Kleine Pizza: 4 Portionen, Mittlere Pizza: 6 Portionen, Große Pizza: 8 Portionen. Dies sind allgemeine Richtwerte für durchschnittliche Pizzen.'
    },
    {
      question: 'Sollte ich mehr Pizzen bestellen als berechnet?',
      answer: 'Ja, es ist ratsam, 1-2 zusätzliche Pizzen zu bestellen, um sicherzustellen, dass alle satt werden. Es ist besser, etwas übrig zu haben als nicht genug.'
    },
    {
      question: 'Was ist, wenn nicht alle Personen Pizza essen?',
      answer: 'Berücksichtigen Sie, dass etwa 80-90% der Personen Pizza essen könnten. Passen Sie die Anzahl der Personen entsprechend an oder reduzieren Sie das Hungerniveau.'
    }
  ]

  const getHambreDescription = (nivel: number) => {
    const descripciones = {
      1: 'Wenig Hunger',
      2: 'Normaler Hunger',
      3: 'Mäßiger Hunger',
      4: 'Viel Hunger',
      5: 'Sehr hungrig'
    }
    return descripciones[nivel as keyof typeof descripciones] || ''
  }

  const getTamañoDescription = (tamaño: string) => {
    const descripciones = {
      'pequeña': 'Klein (4 Portionen)',
      'mediana': 'Mittel (6 Portionen)',
      'grande': 'Groß (8 Portionen)'
    }
    return descripciones[tamaño as keyof typeof descripciones] || tamaño
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Pizza-Person-Rechner',
            description: 'Berechnen Sie, wie viele Pizzen Sie für eine bestimmte Anzahl von Personen benötigen',
            url: '/de/kurioses/pizza-person/',
            category: 'Kurioses'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Pizza-Person-Rechner"
            description="Berechnen Sie, wie viele Pizzen Sie für eine bestimmte Anzahl von Personen benötigen. Perfekte Planung für Ihre nächste Party oder Veranstaltung."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="personas">Anzahl der Personen</Label>
                <Input
                  id="personas"
                  type="number"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  placeholder="z.B. 4"
                />
              </div>
              
              <div>
                <Label htmlFor="nivelHambre">Hungerniveau (1-5)</Label>
                <Input
                  id="nivelHambre"
                  type="number"
                  min="1"
                  max="5"
                  value={nivelHambre}
                  onChange={(e) => setNivelHambre(e.target.value)}
                  placeholder="z.B. 3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1=Wenig, 2=Normal, 3=Mäßig, 4=Viel, 5=Sehr hungrig
                </p>
              </div>
              
              <div>
                <Label htmlFor="tamañoPizza">Pizzagröße</Label>
                <Select value={tamañoPizza} onValueChange={setTamañoPizza}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie eine Größe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeña">🍕 Klein (4 Portionen)</SelectItem>
                    <SelectItem value="mediana">🍕 Mittel (6 Portionen)</SelectItem>
                    <SelectItem value="grande">🍕 Groß (8 Portionen)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Pizzas berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <Pizza className="h-5 w-5" />
                      Pizza-Berechnung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-orange-600 mb-2">
                        {resultado.pizzasNecesarias}
                      </div>
                      <div className="text-2xl font-semibold text-gray-800 mb-4">
                        Pizza{resultado.pizzasNecesarias !== 1 ? 's' : ''} benötigt
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
                      <div className="text-center">
                        <p className="text-lg text-gray-700 mb-4">
                          Für {resultado.personas} Person{resultado.personas !== 1 ? 'en' : ''} mit {getHambreDescription(resultado.nivelHambre).toLowerCase()} benötigen Sie {resultado.pizzasNecesarias} {getTamañoDescription(resultado.tamañoPizza).toLowerCase()}.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Personen</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{resultado.personas}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Utensils className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Portionen</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{resultado.porcionesNecesarias}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Pizza className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Größe</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{getTamañoDescription(resultado.tamañoPizza)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">🍕 Pizza-Tipps</h4>
                      <div className="text-sm text-red-700 space-y-1">
                        <p>• <strong>Puffer hinzufügen:</strong> Bestellen Sie 1-2 zusätzliche Pizzen, um sicherzugehen</p>
                        <p>• <strong>Vielseitigkeit:</strong> Bieten Sie verschiedene Beläge an, um alle Geschmäcker zu berücksichtigen</p>
                        <p>• <strong>Zeitplanung:</strong> Bestellen Sie rechtzeitig, besonders bei größeren Gruppen</p>
                        <p>• <strong>Beilagen:</strong> Vergessen Sie nicht Salate, Getränke und Desserts</p>
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
