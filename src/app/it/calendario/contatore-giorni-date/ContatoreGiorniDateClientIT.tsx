"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar, AlertCircle } from 'lucide-react'
import { calculateDaysBetween, type DaysBetweenResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'

export default function ContatoreGiorniDateClientIT() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<DaysBetweenResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!startDate || !endDate) {
      setError('Per favore, seleziona entrambe le date')
      return
    }

    try {
      const result = calculateDaysBetween(startDate, endDate)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo dei giorni')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' },
    { label: 'Contatore di Giorni tra Date', href: '/it/calendario/contatore-giorni-date' }
  ]

  const examples = [
    {
      label: 'Esempio: 1 gennaio 2024 a 31 dicembre 2024',
      values: { startDate: '2024-01-01', endDate: '2024-12-31' }
    },
    {
      label: 'Esempio: 1 gennaio 2023 a 1 gennaio 2024',
      values: { startDate: '2023-01-01', endDate: '2024-01-01' }
    }
  ]

  const faqItems = [
    {
      question: 'Come vengono calcolati i giorni tra le date?',
      answer: 'Si calcola la differenza esatta in millisecondi tra le due date e si converte in giorni, settimane, mesi e anni.'
    },
    {
      question: 'Sono inclusi gli anni bisestili?',
      answer: 'Sì, la calcolatrice considera automaticamente gli anni bisestili nel calcolo.'
    },
    {
      question: 'Posso usare date future?',
      answer: 'Sì, puoi calcolare la differenza tra qualsiasi coppia di date, incluse le date future.'
    },
    {
      question: 'Che formato di data devo usare?',
      answer: 'Usa il formato YYYY-MM-DD (anno-mese-giorno) che è lo standard internazionale.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contatore di Giorni tra Date - Calcolatrice di Giorni',
            description: 'Calcola la differenza esatta in giorni, settimane, mesi e anni tra due date',
            url: '/it/calendario/contatore-giorni-date/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contatore di Giorni tra Date - Calcolatrice di Giorni"
            description="Calcola la differenza esatta in giorni, settimane, mesi e anni tra due date"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setStartDate(values.startDate as string)
              setEndDate(values.endDate as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Contatore di Giorni tra Date
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data di Inizio
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data di Fine
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calcola Differenza
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
                      <CardTitle className="text-lg">Risultato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.totalDays}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          giorni di differenza
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {results.years}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Anni
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600 mb-1">
                            {results.months}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Mesi
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600 mb-1">
                            {results.weeks}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Settimane
                          </div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="text-xl font-bold text-orange-600 mb-1">
                            {results.days}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Giorni
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Dettagli del Calcolo:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Data di inizio:</span>
                            <span className="font-medium">{results.breakdown.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Data di fine:</span>
                            <span className="font-medium">{results.breakdown.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale giorni:</span>
                            <span className="font-medium">{results.totalDays}</span>
                          </div>
                          {results.breakdown.isLeapYear && (
                            <div className="flex justify-between text-blue-600">
                              <span>Include anno bisestile:</span>
                              <span className="font-medium">Sì</span>
                            </div>
                          )}
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
    </div>
  )
}
