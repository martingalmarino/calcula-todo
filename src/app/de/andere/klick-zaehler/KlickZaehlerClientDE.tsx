"use client"

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MousePointer, Play, Square, RotateCcw } from 'lucide-react'
import { calculateClickStats, type ClickTestResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function KlickZaehlerClientDE() {
  const [isRunning, setIsRunning] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [results, setResults] = useState<ClickTestResult | null>(null)
  const [bestScore, setBestScore] = useState<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        setTimeElapsed((Date.now() - startTimeRef.current) / 1000)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
    setClicks(0)
    setTimeElapsed(0)
    setResults(null)
  }

  const handleStop = () => {
    setIsRunning(false)
    if (clicks > 0 && timeElapsed > 0) {
      const result = calculateClickStats(clicks, timeElapsed)
      setResults(result)
      if (result.cps > bestScore) {
        setBestScore(result.cps)
      }
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setClicks(0)
    setTimeElapsed(0)
    setResults(null)
  }

  const handleClick = () => {
    if (isRunning) {
      setClicks(prev => prev + 1)
    }
  }

  const handleExample = () => {
    // Beispiel-Daten für FAQ
  }

  const breadcrumbs = getBreadcrumbs('/de/andere/klick-zaehler')

  const examples = [
    {
      label: 'Testen Sie Ihre Geschwindigkeit',
      values: {}
    }
  ]

  const faqItems = [
    {
      question: 'Wie funktioniert der Klick-Test?',
      answer: 'Klicken Sie auf "Start", dann so schnell wie möglich auf den Klick-Bereich. Klicken Sie "Stop", um den Test zu beenden und Ihre Ergebnisse zu sehen.'
    },
    {
      question: 'Was ist CPS?',
      answer: 'CPS steht für "Clicks Per Second" (Klicks pro Sekunde). Es ist ein Maß für Ihre Klickgeschwindigkeit.'
    },
    {
      question: 'Wie kann ich meine Klickgeschwindigkeit verbessern?',
      answer: 'Üben Sie regelmäßig, verwenden Sie eine gute Maus, halten Sie Ihre Hand entspannt und konzentrieren Sie sich auf Präzision und Geschwindigkeit.'
    },
    {
      question: 'Was ist eine gute Klickgeschwindigkeit?',
      answer: 'Durchschnittlich: 5-7 CPS. Gut: 7-10 CPS. Sehr gut: 10+ CPS. Professionelle Spieler erreichen oft 12+ CPS.'
    }
  ]

  const getCPSColor = (cps: number) => {
    if (cps >= 10) return 'text-green-600'
    if (cps >= 7) return 'text-blue-600'
    if (cps >= 5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCPSRating = (cps: number) => {
    if (cps >= 12) return 'Professionell'
    if (cps >= 10) return 'Sehr gut'
    if (cps >= 7) return 'Gut'
    if (cps >= 5) return 'Durchschnittlich'
    return 'Verbesserungsbedarf'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Klick-Zähler - Geschwindigkeitstest Online',
            description: 'Testen Sie Ihre Klickgeschwindigkeit und messen Sie Clicks pro Sekunde',
            url: '/de/andere/klick-zaehler/',
            category: 'Spiele'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Klick-Zähler - Geschwindigkeitstest Online"
            description="Testen Sie Ihre Klickgeschwindigkeit und messen Sie Clicks pro Sekunde (CPS). Perfekt für Gaming, Reaktionstests und Fingerfertigkeit."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="space-y-6">
              {/* Kontrollen */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" />
                    Klick-Test Kontrollen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    {!isRunning ? (
                      <Button onClick={handleStart} className="calculator-button">
                        <Play className="h-4 w-4" />
                        Start
                      </Button>
                    ) : (
                      <Button onClick={handleStop} variant="destructive">
                        <Square className="h-4 w-4" />
                        Stop
                      </Button>
                    )}
                    <Button onClick={handleReset} variant="outline">
                      <RotateCcw className="h-4 w-4" />
                      Zurücksetzen
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Klick-Bereich */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {isRunning ? 'Klicken Sie so schnell wie möglich!' : 'Klicken Sie "Start" um zu beginnen'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className={`w-full h-64 rounded-lg border-4 border-dashed flex items-center justify-center text-2xl font-bold transition-colors ${
                      isRunning 
                        ? 'border-green-500 bg-green-50 text-green-700 cursor-pointer hover:bg-green-100' 
                        : 'border-gray-300 bg-gray-50 text-gray-500'
                    }`}
                    onClick={handleClick}
                  >
                    {isRunning ? (
                      <div className="text-center">
                        <div className="text-4xl mb-2">👆</div>
                        <div>Klicken Sie hier!</div>
                        <div className="text-lg mt-2">Klicks: {clicks}</div>
                        <div className="text-lg">Zeit: {timeElapsed.toFixed(1)}s</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2">🖱️</div>
                        <div>Klick-Bereich</div>
                        <div className="text-sm mt-2">Warten auf Start...</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ergebnisse */}
              {results && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <MousePointer className="h-5 w-5" />
                      Testergebnisse
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-2 ${getCPSColor(results.cps)}`}>
                        {results.cps}
                      </div>
                      <div className="text-2xl font-semibold text-gray-800 mb-2">
                        CPS (Klicks pro Sekunde)
                      </div>
                      <div className="text-lg text-gray-600">
                        Bewertung: {getCPSRating(results.cps)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {results.clicks}
                        </div>
                        <div className="text-sm text-gray-600">
                          Gesamtklicks
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {results.timeElapsed}s
                        </div>
                        <div className="text-sm text-gray-600">
                          Zeit
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {results.averageTime}ms
                        </div>
                        <div className="text-sm text-gray-600">
                          Ø Zeit/Klick
                        </div>
                      </div>
                    </div>

                    {bestScore > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">🏆 Beste Punktzahl</h4>
                        <div className="text-2xl font-bold text-yellow-600">
                          {bestScore} CPS
                        </div>
                      </div>
                    )}

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💡 Tipps zur Verbesserung</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Regelmäßiges Training:</strong> Üben Sie täglich für bessere Ergebnisse</p>
                        <p>• <strong>Gute Maus:</strong> Verwenden Sie eine präzise, responsive Maus</p>
                        <p>• <strong>Entspannte Hand:</strong> Halten Sie Ihre Hand entspannt und natürlich</p>
                        <p>• <strong>Konzentration:</strong> Fokussieren Sie sich auf Geschwindigkeit und Präzision</p>
                        <p>• <strong>Fingerposition:</strong> Verwenden Sie den Zeigefinger für optimale Kontrolle</p>
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
