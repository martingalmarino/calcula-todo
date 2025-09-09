"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User, AlertCircle } from 'lucide-react'
import { calculateAge, type AgeResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalcolatriceEtaClientIT() {
  const [birthDate, setBirthDate] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [results, setResults] = useState<AgeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!birthDate) {
      setError('Per favore, seleziona la tua data di nascita')
      return
    }

    try {
      const result = calculateAge(birthDate, currentDate || undefined)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo dell\'età')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' },
    { label: 'Calcolatrice dell\'Età', href: '/it/calendario/calcolatrice-eta' }
  ]

  const examples = [
    {
      label: 'Esempio: Nato il 1 gennaio 1990',
      values: { birthDate: '1990-01-01' }
    },
    {
      label: 'Esempio: Nato il 15 marzo 1985',
      values: { birthDate: '1985-03-15' }
    }
  ]

  const faqItems = [
    {
      question: 'Come viene calcolata l\'età esatta?',
      answer: 'Si calcola la differenza tra la data di nascita e la data attuale, considerando anni, mesi e giorni esatti.'
    },
    {
      question: 'Posso usare una data specifica?',
      answer: 'Sì, puoi calcolare l\'età in qualsiasi data specifica, non solo la data attuale.'
    },
    {
      question: 'Sono considerati gli anni bisestili?',
      answer: 'Sì, la calcolatrice considera automaticamente gli anni bisestili nel calcolo.'
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
            name: 'Calcolatrice dell\'Età - Calcolare Età Esatta',
            description: 'Calcola la tua età esatta in anni, mesi e giorni dalla tua data di nascita',
            url: '/it/calendario/calcolatrice-eta/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice dell\'Età - Calcolare Età Esatta"
            description="Calcola la tua età esatta in anni, mesi e giorni dalla tua data di nascita"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setBirthDate(values.birthDate as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Calcolatrice dell\'Età
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data di Nascita *
                    </label>
                    <Input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data di Riferimento (opzionale)
                    </label>
                    <Input
                      type="date"
                      value={currentDate}
                      onChange={(e) => setCurrentDate(e.target.value)}
                      className="w-full"
                      placeholder="Lascia vuoto per usare la data attuale"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lascia vuoto per calcolare con la data attuale
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <User className="h-4 w-4 mr-2" />
                  Calcola Età
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
                      <CardTitle className="text-lg">La Tua Età Esatta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.years} anni
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {results.months} mesi e {results.days} giorni
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {results.years}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Anni
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {results.months}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Mesi
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {results.days}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Giorni
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Informazioni Aggiuntive:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Data di nascita:</span>
                            <span className="font-medium">{results.breakdown.birthDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Data di riferimento:</span>
                            <span className="font-medium">{results.breakdown.currentDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale giorni vissuti:</span>
                            <span className="font-medium">{results.totalDays.toLocaleString()}</span>
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
