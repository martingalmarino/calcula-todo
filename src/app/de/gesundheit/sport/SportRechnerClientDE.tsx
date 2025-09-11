"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, AlertCircle } from 'lucide-react'
import { calculateExercise, type ExerciseResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function SportRechnerClientDE() {
  const [weight, setWeight] = useState('')
  const [duration, setDuration] = useState('')
  const [exerciseType, setExerciseType] = useState<'walking' | 'running' | 'cycling' | 'swimming' | 'weightlifting'>('running')
  const [intensity, setIntensity] = useState<'low' | 'moderate' | 'high'>('moderate')
  const [results, setResults] = useState<ExerciseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !duration) {
      setError('Bitte geben Sie Gewicht und Dauer ein')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const durationNum = parseFloat(duration)
      
      if (isNaN(weightNum) || isNaN(durationNum)) {
        setError('Bitte geben Sie gültige Zahlenwerte ein')
        return
      }

      const result = calculateExercise(weightNum, durationNum, exerciseType, intensity, 'de')
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Sportberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.duration) setDuration(example.duration as string)
    if (example.exerciseType) setExerciseType(example.exerciseType as 'walking' | 'running' | 'cycling' | 'swimming' | 'weightlifting')
    if (example.intensity) setIntensity(example.intensity as 'low' | 'moderate' | 'high')
  }

  const breadcrumbs = getBreadcrumbs('/de/gesundheit/sport')

  const examples = [
    {
      label: 'Beispiel: 70kg, 30 Min Laufen, moderate Intensität',
      values: { weight: '70', duration: '30', exerciseType: 'running', intensity: 'moderate' }
    },
    {
      label: 'Beispiel: 60kg, 45 Min Radfahren, hohe Intensität',
      values: { weight: '60', duration: '45', exerciseType: 'cycling', intensity: 'high' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie werden die verbrannten Kalorien berechnet?',
      answer: 'Die Berechnung basiert auf METs (Metabolic Equivalent of Task), die den Energieverbrauch verschiedener Aktivitäten im Verhältnis zum Ruheumsatz messen.'
    },
    {
      question: 'Was bedeuten die verschiedenen Intensitätsstufen?',
      answer: 'Niedrig: entspanntes Tempo, Moderat: mittleres Tempo mit leichter Anstrengung, Hoch: intensives Tempo mit hoher Anstrengung.'
    },
    {
      question: 'Welche Faktoren beeinflussen den Kalorienverbrauch?',
      answer: 'Gewicht, Dauer, Intensität, individuelle Fitness und Effizienz der Bewegungsausführung beeinflussen den tatsächlichen Kalorienverbrauch.'
    },
    {
      question: 'Wie genau sind diese Berechnungen?',
      answer: 'Die Berechnungen sind Schätzungen basierend auf Durchschnittswerten. Der tatsächliche Verbrauch kann je nach individueller Fitness und Technik variieren.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Sport-Rechner - Kalorien beim Sport',
            description: 'Berechnen Sie verbrannte Kalorien bei verschiedenen Sportarten',
            url: '/de/gesundheit/sport/',
            category: 'Gesundheit'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Sport-Rechner - Kalorien beim Sport"
            description="Berechnen Sie verbrannte Kalorien bei verschiedenen Sportarten und Intensitäten. Ideal für Fitness-Tracking und Trainingsplanung"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Sport-Rechner
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
                      Dauer (Minuten)
                    </label>
                    <Input
                      type="number"
                      placeholder="z.B. 30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sportart
                    </label>
                    <Select value={exerciseType} onValueChange={(value: 'walking' | 'running' | 'cycling' | 'swimming' | 'weightlifting') => setExerciseType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="walking">Gehen</SelectItem>
                        <SelectItem value="running">Laufen</SelectItem>
                        <SelectItem value="cycling">Radfahren</SelectItem>
                        <SelectItem value="swimming">Schwimmen</SelectItem>
                        <SelectItem value="weightlifting">Krafttraining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Intensität
                    </label>
                    <Select value={intensity} onValueChange={(value: 'low' | 'moderate' | 'high') => setIntensity(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Niedrig</SelectItem>
                        <SelectItem value="moderate">Moderat</SelectItem>
                        <SelectItem value="high">Hoch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Kalorien berechnen
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
                      <CardTitle className="text-lg">Sport-Berechnung Ergebnis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {results.caloriesBurned} kcal
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                          Verbrannte Kalorien
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Trainingsdetails:</h4>
                        <p className="text-blue-800 text-sm">
                          Dauer: {results.duration} Minuten
                        </p>
                        <p className="text-blue-800 text-sm">
                          Intensität: {results.intensity}
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
