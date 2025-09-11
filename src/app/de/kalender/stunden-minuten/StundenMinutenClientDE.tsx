"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Clock, Calculator, Info } from 'lucide-react'
import { calculateTimeOperation, type TimeCalculationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function StundenMinutenClientDE() {
  const [time1, setTime1] = useState('')
  const [time2, setTime2] = useState('')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [results, setResults] = useState<TimeCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!time1 || !time2) {
      setError('Bitte geben Sie beide Zeiten ein')
      return
    }

    try {
      const result = calculateTimeOperation(time1, time2, operation)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Berechnen der Zeit')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setTime1((values.time1 as string) || '')
    setTime2((values.time2 as string) || '')
    setOperation((values.operation as 'add' | 'subtract') || 'add')
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/kalender/stunden-minuten')

  const examples = [
    {
      label: 'Beispiel: 8:30 + 2:15',
      values: { time1: '08:30', time2: '02:15', operation: 'add' }
    },
    {
      label: 'Beispiel: 17:45 - 1:30',
      values: { time1: '17:45', time2: '01:30', operation: 'subtract' }
    }
  ]

  const faqItems = [
    {
      question: "Wie funktioniert der Stunden- und Minuten-Rechner?",
      answer: "Der Rechner ermöglicht es, zwei Zeiten zu addieren oder zu subtrahieren. Geben Sie die Zeiten im Format HH:MM ein und wählen Sie die gewünschte Operation."
    },
    {
      question: "Welches Zeitformat sollte ich verwenden?",
      answer: "Verwenden Sie das 24-Stunden-Format HH:MM (z.B. 14:30 für 2:30 PM). Stunden sollten zwischen 00-23 und Minuten zwischen 00-59 liegen."
    },
    {
      question: "Was passiert, wenn das Ergebnis über 24 Stunden geht?",
      answer: "Der Rechner normalisiert automatisch das Ergebnis auf das 24-Stunden-Format. Bei der Addition wird das Ergebnis modulo 24 Stunden berechnet."
    },
    {
      question: "Kann ich auch negative Zeiten berechnen?",
      answer: "Bei der Subtraktion wird das Ergebnis automatisch auf positive Werte normalisiert, indem bei negativen Ergebnissen 24 Stunden hinzugefügt werden."
    }
  ]

  const structuredData = jsonLdCalculator({
    name: 'Stunden und Minuten-Rechner',
    description: 'Addieren und Subtrahieren von Stunden und Minuten',
    category: 'Kalender',
    url: '/de/kalender/stunden-minuten'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorLayout
        title="Stunden und Minuten-Rechner"
        description="Addieren und Subtrahieren von Stunden und Minuten"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExample}
      >
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Zeit berechnen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time1">Erste Zeit *</Label>
                  <Input
                    id="time1"
                    type="time"
                    value={time1}
                    onChange={(e) => setTime1(e.target.value)}
                    placeholder="HH:MM"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="operation">Operation</Label>
                  <Select value={operation} onValueChange={(value: 'add' | 'subtract') => setOperation(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Addieren (+)</SelectItem>
                      <SelectItem value="subtract">Subtrahieren (-)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time2">Zweite Zeit *</Label>
                  <Input
                    id="time2"
                    type="time"
                    value={time2}
                    onChange={(e) => setTime2(e.target.value)}
                    placeholder="HH:MM"
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Zeit berechnen
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Zeitergebnis</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Ergebnis:</span> {String(results.hours).padStart(2, '0')}:{String(results.minutes).padStart(2, '0')}
                          </div>
                          <div>
                            <span className="font-medium">Gesamtminuten:</span> {results.totalMinutes}
                          </div>
                          <div>
                            <span className="font-medium">Gesamtstunden:</span> {results.totalHours.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Erste Zeit:</span> {results.breakdown.time1}</div>
                            <div><span className="font-medium">Zweite Zeit:</span> {results.breakdown.time2}</div>
                            <div><span className="font-medium">Operation:</span> {operation === 'add' ? 'Addieren' : 'Subtrahieren'}</div>
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wie funktioniert der Zeit-Rechner?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Der Zeit-Rechner ermöglicht es, zwei Zeiten zu addieren oder zu subtrahieren.
              </p>
              <p>
                <strong>Format:</strong> Verwenden Sie das 24-Stunden-Format HH:MM 
                (z.B. 14:30 für 2:30 PM).
              </p>
              <p>
                <strong>Normalisierung:</strong> Das Ergebnis wird automatisch auf das 
                24-Stunden-Format normalisiert.
              </p>
              <p>
                <strong>Anwendung:</strong> Nützlich für Arbeitszeitberechnungen, 
                Ereignisdauer, etc.
              </p>
            </CardContent>
          </Card>
        </div>
      </CalculatorLayout>
    </>
  )
}
