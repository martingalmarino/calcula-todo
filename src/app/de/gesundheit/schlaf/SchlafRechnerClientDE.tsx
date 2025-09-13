"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Moon, AlertCircle } from 'lucide-react'
import { calculateSleep, type SleepResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function SchlafRechnerClientDE() {
  const [wakeUpTime, setWakeUpTime] = useState('')
  const [results, setResults] = useState<SleepResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!wakeUpTime) {
      setError('Bitte geben Sie Ihre Aufwachzeit ein')
      return
    }

    try {
      const result = calculateSleep(wakeUpTime, 'de')
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Schlafberechnung')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.wakeUpTime) setWakeUpTime(example.wakeUpTime as string)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/gesundheit/schlaf')

  const examples = [
    {
      label: 'Beispiel: Aufwachen um 7:00 Uhr',
      values: { wakeUpTime: '07:00' }
    },
    {
      label: 'Beispiel: Aufwachen um 6:30 Uhr',
      values: { wakeUpTime: '06:30' }
    }
  ]

  const faqItems = [
    {
      question: 'Was sind Schlafzyklen?',
      answer: 'Schlafzyklen sind wiederkehrende Muster von Schlafphasen, die etwa 90 Minuten dauern. Ein vollständiger Zyklus umfasst Leichtschlaf, Tiefschlaf und REM-Schlaf.'
    },
    {
      question: 'Wie viele Schlafzyklen brauche ich?',
      answer: 'Die meisten Menschen benötigen 5 vollständige Schlafzyklen (7,5 Stunden) für optimale Erholung. Dies kann je nach individuellen Bedürfnissen variieren.'
    },
    {
      question: 'Warum ist es wichtig, zu den richtigen Zeiten zu schlafen?',
      answer: 'Das Aufwachen am Ende eines Schlafzyklus führt zu besserer Erholung und weniger Müdigkeit. Das Aufwachen mitten in einem Zyklus kann zu Schläfrigkeit führen.'
    },
    {
      question: 'Wie kann ich meine Schlafqualität verbessern?',
      answer: 'Gehen Sie jeden Abend zur gleichen Zeit ins Bett, vermeiden Sie helle Bildschirme vor dem Schlafengehen und schaffen Sie eine kühle, dunkle und ruhige Schlafumgebung.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Schlaf-Rechner - Optimale Schlafzeiten',
            description: 'Berechnen Sie optimale Schlafzeiten basierend auf Schlafzyklen',
            url: '/de/gesundheit/schlaf/',
            category: 'Gesundheit'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Schlaf-Rechner - Optimale Schlafzeiten"
            description="Berechnen Sie optimale Schlafzeiten basierend auf Schlafzyklen. Ideal für bessere Schlafqualität und Erholung"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Schlaf-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Aufwachzeit
                    </label>
                    <Input
                      type="time"
                      value={wakeUpTime}
                      onChange={(e) => setWakeUpTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Schlafzeiten berechnen
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
                      <CardTitle className="text-lg">Optimale Schlafzeiten</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {results.bedTime}
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                          Empfohlene Schlafenszeit
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Schlafplan:</h4>
                        <p className="text-blue-800 text-sm">
                          Aufwachen: {results.wakeUpTime}
                        </p>
                        <p className="text-blue-800 text-sm">
                          Schlafzyklen: {results.sleepCycles} (7,5 Stunden)
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Empfehlungen für besseren Schlaf:</h4>
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
