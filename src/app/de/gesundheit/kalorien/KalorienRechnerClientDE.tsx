"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Activity, AlertCircle } from 'lucide-react'
import { calculateCalories, type CaloriesResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function KalorienRechnerClientDE() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>('moderate')
  const [results, setResults] = useState<CaloriesResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !height || !age) {
      setError('Bitte geben Sie alle erforderlichen Werte ein')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      const ageNum = parseInt(age)
      
      if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) {
        setError('Bitte geben Sie gültige Zahlenwerte ein')
        return
      }

      const result = calculateCalories(weightNum, heightNum, ageNum, gender, activityLevel, 'de')
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Kalorienberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.height) setHeight(example.height as string)
    if (example.age) setAge(example.age as string)
    if (example.gender) setGender(example.gender as 'male' | 'female')
    if (example.activityLevel) setActivityLevel(example.activityLevel as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active')
  }

  const breadcrumbs = getBreadcrumbsDE('/de/gesundheit/kalorien')

  const examples = [
    {
      label: 'Beispiel: Mann 30 Jahre, 75kg, 180cm, moderat aktiv',
      values: { weight: '75', height: '180', age: '30', gender: 'male', activityLevel: 'moderate' }
    },
    {
      label: 'Beispiel: Frau 25 Jahre, 60kg, 165cm, leicht aktiv',
      values: { weight: '60', height: '165', age: '25', gender: 'female', activityLevel: 'light' }
    }
  ]

  const faqItems = [
    {
      question: 'Was ist der tägliche Kalorienbedarf?',
      answer: 'Der tägliche Kalorienbedarf ist die Anzahl der Kalorien, die Ihr Körper täglich benötigt, um sein Gewicht zu halten. Er umfasst Grundumsatz und körperliche Aktivität.'
    },
    {
      question: 'Wie wird der Kalorienbedarf berechnet?',
      answer: 'Wir verwenden die Mifflin-St Jeor-Formel für den Grundumsatz und multiplizieren ihn mit einem Aktivitätsfaktor basierend auf Ihrem Lebensstil.'
    },
    {
      question: 'Was bedeuten die verschiedenen Aktivitätsniveaus?',
      answer: 'Sitzend: wenig bis keine Bewegung, Leicht: leichte Bewegung 1-3 Tage/Woche, Moderat: moderate Bewegung 3-5 Tage/Woche, Aktiv: intensive Bewegung 6-7 Tage/Woche, Sehr aktiv: sehr intensive Bewegung täglich.'
    },
    {
      question: 'Wie kann ich meinen Kalorienbedarf anpassen?',
      answer: 'Um Gewicht zu verlieren, verbrauchen Sie 500 Kalorien weniger pro Tag. Um Gewicht zu gewinnen, verbrauchen Sie 500 Kalorien mehr pro Tag.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Kalorien-Rechner - Täglicher Kalorienbedarf',
            description: 'Berechnen Sie Ihren täglichen Kalorienbedarf basierend auf Ihrem Aktivitätsniveau',
            url: '/de/gesundheit/kalorien/',
            category: 'Gesundheit'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Kalorien-Rechner - Täglicher Kalorienbedarf"
            description="Berechnen Sie Ihren täglichen Kalorienbedarf basierend auf Gewicht, Größe, Alter und Aktivitätsniveau. Ideal für die Ernährungsplanung"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Kalorien-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Größe (cm)
                    </label>
                    <Input
                      type="number"
                      placeholder="z.B. 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Geschlecht
                    </label>
                    <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Mann</SelectItem>
                        <SelectItem value="female">Frau</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Aktivitätsniveau
                    </label>
                    <Select value={activityLevel} onValueChange={(value: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active') => setActivityLevel(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sitzend (wenig bis keine Bewegung)</SelectItem>
                        <SelectItem value="light">Leicht (leichte Bewegung 1-3 Tage/Woche)</SelectItem>
                        <SelectItem value="moderate">Moderat (moderate Bewegung 3-5 Tage/Woche)</SelectItem>
                        <SelectItem value="active">Aktiv (intensive Bewegung 6-7 Tage/Woche)</SelectItem>
                        <SelectItem value="very_active">Sehr aktiv (sehr intensive Bewegung täglich)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Kalorienbedarf berechnen
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
                      <CardTitle className="text-lg">Kalorienberechnung Ergebnis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {results.totalCalories} kcal
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                          Täglicher Kalorienbedarf
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Berechnungsdetails:</h4>
                        <p className="text-blue-800 text-sm">
                          Grundumsatz: {results.tmb} kcal/Tag
                        </p>
                        <p className="text-blue-800 text-sm">
                          Aktivitätsniveau: {results.activityLevel}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Empfehlungen:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {results.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
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
    </>
  )
}
