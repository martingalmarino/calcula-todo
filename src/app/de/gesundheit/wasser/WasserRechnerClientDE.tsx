"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Droplets, Activity, AlertCircle } from 'lucide-react'
import { calculateWaterIntake, type WaterIntakeResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function WasserRechnerClientDE() {
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate')
  const [results, setResults] = useState<WaterIntakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !age) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const ageNum = parseInt(age)
      
      if (isNaN(weightNum) || isNaN(ageNum)) {
        setError('Bitte geben Sie gültige Zahlenwerte ein')
        return
      }

      const result = calculateWaterIntake(weightNum, ageNum, activityLevel)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Wasserberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.age) setAge(example.age as string)
    if (example.activityLevel) setActivityLevel(example.activityLevel as 'low' | 'moderate' | 'high')
  }

  const breadcrumbs = getBreadcrumbsDE('/de/gesundheit/wasser')

  const examples = [
    {
      label: 'Beispiel: 70kg, 30 Jahre, moderate Aktivität',
      values: { weight: '70', age: '30', activityLevel: 'moderate' }
    },
    {
      label: 'Beispiel: 60kg, 25 Jahre, hohe Aktivität',
      values: { weight: '60', age: '25', activityLevel: 'high' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie wird die empfohlene Wasseraufnahme berechnet?',
      answer: 'Die Berechnung basiert auf 35ml pro kg Körpergewicht, angepasst an Alter und Aktivitätsniveau. Dies berücksichtigt individuelle Bedürfnisse.'
    },
    {
      question: 'Welche Faktoren beeinflussen den Wasserbedarf?',
      answer: 'Gewicht, Alter, Aktivitätsniveau, Klima, Gesundheitszustand und Schwangerschaft/Stillzeit beeinflussen den Wasserbedarf.'
    },
    {
      question: 'Was sind Anzeichen von Dehydratation?',
      answer: 'Durst, trockener Mund, Müdigkeit, Schwindel, dunkler Urin und verminderte Häufigkeit des Wasserlassens sind Anzeichen von Dehydratation.'
    },
    {
      question: 'Kann ich zu viel Wasser trinken?',
      answer: 'Ja, obwohl es selten ist. Eine Wasservergiftung kann auftreten, wenn mehr als 1 Liter pro Stunde über mehrere Stunden getrunken wird.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Wasser-Rechner - Tägliche Wasseraufnahme',
            description: 'Berechnen Sie Ihre tägliche Wasseraufnahme basierend auf Gewicht, Alter und Aktivitätsniveau',
            url: '/de/gesundheit/wasser/',
            category: 'Gesundheit'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Wasser-Rechner - Tägliche Wasseraufnahme"
            description="Berechnen Sie Ihre tägliche Wasseraufnahme basierend auf Gewicht, Alter und Aktivitätsniveau. Ideal für optimale Hydratation"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Wasser-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Gewicht (kg)
                    </label>
                    <Input
                      type="number"
                      placeholder="z.B. 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Alter (Jahre)
                    </label>
                    <Input
                      type="number"
                      placeholder="z.B. 30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Aktivitätsniveau
                    </label>
                    <Select value={activityLevel} onValueChange={(value: 'low' | 'moderate' | 'high') => setActivityLevel(value)}>
                      <SelectTrigger className="w-full">
                        <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Wählen Sie Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Niedrig (sitzend)</SelectItem>
                        <SelectItem value="moderate">Moderat (leichte Bewegung)</SelectItem>
                        <SelectItem value="high">Hoch (intensive Bewegung)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]"
                >
                  <Droplets className="h-4 w-4 mr-2" />
                  Wasseraufnahme berechnen
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
                      <CardTitle className="text-lg">Empfehlung für tägliche Wasseraufnahme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {results.dailyWater} ml
                        </div>
                        <div className="text-lg text-gray-600">
                          {results.dailyWater / 1000} Liter pro Tag
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {results.glasses}
                          </div>
                          <div className="text-sm text-gray-600">
                            Gläser (250ml)
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {results.bottles}
                          </div>
                          <div className="text-sm text-gray-600">
                            Flaschen (500ml)
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {results.category}
                          </div>
                          <div className="text-sm text-gray-600">
                            Aufnahmeniveau
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Empfehlungen:</h4>
                        <ul className="space-y-2 text-sm">
                          {results.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
