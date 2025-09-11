"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Plus, Calculator, Info } from 'lucide-react'
import { addSubtractDays, type DateOperationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function TageAddierenSubtrahierenClientDE() {
  const [date, setDate] = useState('')
  const [days, setDays] = useState('')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [results, setResults] = useState<DateOperationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!date || !days) {
      setError('Bitte geben Sie ein Datum und die Anzahl der Tage ein')
      return
    }

    const daysNum = parseInt(days)
    if (isNaN(daysNum) || daysNum < 0) {
      setError('Bitte geben Sie eine gültige Anzahl von Tagen ein (0 oder größer)')
      return
    }

    try {
      const result = addSubtractDays(date, daysNum, operation)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Berechnen des Datums')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setDate((values.date as string) || '')
    setDays((values.days as string) || '')
    setOperation((values.operation as 'add' | 'subtract') || 'add')
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/kalender/tage-addieren-subtrahieren')

  const examples = [
    {
      label: 'Beispiel: 1. Januar 2024 + 30 Tage',
      values: { date: '2024-01-01', days: '30', operation: 'add' }
    },
    {
      label: 'Beispiel: 15. März 2024 - 7 Tage',
      values: { date: '2024-03-15', days: '7', operation: 'subtract' }
    }
  ]

  const faqItems = [
    {
      question: "Wie funktioniert der Tage addieren/subtrahieren-Rechner?",
      answer: "Der Rechner ermöglicht es, eine bestimmte Anzahl von Tagen zu einem Datum hinzuzufügen oder davon zu subtrahieren. Monats- und Jahreswechsel werden automatisch berücksichtigt."
    },
    {
      question: "Werden Schaltjahre berücksichtigt?",
      answer: "Ja, der Rechner berücksichtigt automatisch Schaltjahre (29. Februar) und berechnet die korrekte Anzahl der Tage in jedem Monat."
    },
    {
      question: "Was passiert bei Monats- und Jahreswechsel?",
      answer: "Der Rechner behandelt automatisch Monats- und Jahreswechsel. Wenn Sie z.B. 30 Tage zum 1. Januar hinzufügen, erhalten Sie den 31. Januar."
    },
    {
      question: "Welches Datumsformat sollte ich verwenden?",
      answer: "Verwenden Sie das Format JJJJ-MM-TT (z.B. 2024-01-15). Dies ist das internationale Standardformat und funktioniert am besten."
    }
  ]

  const structuredData = jsonLdCalculator({
    name: 'Tage addieren/subtrahieren',
    description: 'Addieren oder subtrahieren Sie Tage zu einem Datum',
    category: 'Kalender',
    url: '/de/kalender/tage-addieren-subtrahieren'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorLayout
        title="Tage addieren/subtrahieren"
        description="Addieren oder subtrahieren Sie Tage zu einem Datum"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExample}
      >
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Datum berechnen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Basis-Datum *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="JJJJ-MM-TT"
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
                  <Label htmlFor="days">Anzahl der Tage *</Label>
                  <Input
                    id="days"
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="z.B. 30"
                    min="0"
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Datum berechnen
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
                    <AlertTitle>Berechnungsergebnis</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Neues Datum:</span> {results.resultDate}
                          </div>
                          <div>
                            <span className="font-medium">Wochentag:</span> {results.dayOfWeek}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Basis-Datum:</span> {results.originalDate}</div>
                            <div><span className="font-medium">Operation:</span> {operation === 'add' ? 'Addieren' : 'Subtrahieren'}</div>
                            <div><span className="font-medium">Anzahl Tage:</span> {days}</div>
                            {results.breakdown.isLeapYear && (
                              <div className="text-blue-600">
                                <span className="font-medium">Schaltjahr berücksichtigt</span>
                              </div>
                            )}
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
              <CardTitle>Wie funktioniert der Datums-Rechner?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Der Datums-Rechner ermöglicht es, eine bestimmte Anzahl von Tagen 
                zu einem Datum hinzuzufügen oder davon zu subtrahieren.
              </p>
              <p>
                <strong>Automatische Berechnung:</strong> Monats- und Jahreswechsel 
                werden automatisch berücksichtigt.
              </p>
              <p>
                <strong>Schaltjahre:</strong> Der Rechner berücksichtigt automatisch 
                Schaltjahre und die korrekte Anzahl der Tage in jedem Monat.
              </p>
              <p>
                <strong>Anwendung:</strong> Nützlich für Fristen, Terminplanung, 
                Projektmanagement, etc.
              </p>
            </CardContent>
          </Card>
        </div>
      </CalculatorLayout>
    </>
  )
}
