"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Minus, AlertCircle } from 'lucide-react'
import { addSubtractDays, type DateOperationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'

export default function AggiungiSottraiGiorniClientIT() {
  const [date, setDate] = useState('')
  const [days, setDays] = useState('')
  const [addResult, setAddResult] = useState<DateOperationResult | null>(null)
  const [subtractResult, setSubtractResult] = useState<DateOperationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddDays = () => {
    setError(null)
    
    if (!date || !days) {
      setError('Per favore, completa tutti i campi')
      return
    }

    try {
      const daysNum = parseInt(days)
      if (isNaN(daysNum) || daysNum < 0) {
        setError('Per favore, inserisci un numero valido di giorni')
        return
      }

      const result = addSubtractDays(date, daysNum, 'add')
      setAddResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nell\'aggiunta dei giorni')
    }
  }

  const handleSubtractDays = () => {
    setError(null)
    
    if (!date || !days) {
      setError('Per favore, completa tutti i campi')
      return
    }

    try {
      const daysNum = parseInt(days)
      if (isNaN(daysNum) || daysNum < 0) {
        setError('Per favore, inserisci un numero valido di giorni')
        return
      }

      const result = addSubtractDays(date, daysNum, 'subtract')
      setSubtractResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nella sottrazione dei giorni')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' },
    { label: 'Aggiungi/Sottrai Giorni', href: '/it/calendario/aggiungi-sottrai-giorni' }
  ]

  const examples = [
    {
      label: 'Esempio: Aggiungi 30 giorni al 1 gennaio 2024',
      values: { date: '2024-01-01', days: '30' }
    },
    {
      label: 'Esempio: Sottrai 15 giorni dal 15 marzo 2024',
      values: { date: '2024-03-15', days: '15' }
    }
  ]

  const faqItems = [
    {
      question: 'Come funziona l\'aggiunta di giorni?',
      answer: 'Aggiunge il numero specificato di giorni alla data base, considerando automaticamente i cambi di mese e anno.'
    },
    {
      question: 'Come funziona la sottrazione di giorni?',
      answer: 'Sottrae il numero specificato di giorni dalla data base, considerando automaticamente i cambi di mese e anno.'
    },
    {
      question: 'Posso usare date future?',
      answer: 'Sì, puoi aggiungere o sottrarre giorni da qualsiasi data, incluse le date future.'
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
            name: 'Aggiungi/Sottrai Giorni a una Data - Calcolatrice di Date',
            description: 'Aggiungi o sottrai giorni a una data specifica per calcolare date future o passate',
            url: '/it/calendario/aggiungi-sottrai-giorni/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Aggiungi/Sottrai Giorni a una Data - Calcolatrice di Date"
            description="Aggiungi o sottrai giorni a una data specifica per calcolare date future o passate"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setDate(values.date as string)
              setDays(values.days as string)
            }}
          >
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add" className="calculator-tab">
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Giorni
                </TabsTrigger>
                <TabsTrigger value="subtract" className="calculator-tab">
                  <Minus className="h-4 w-4 mr-2" />
                  Sottrai Giorni
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Aggiungi Giorni a una Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Data Base
                        </label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Giorni da Aggiungere
                        </label>
                        <Input
                          type="number"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          placeholder="Es: 30"
                          className="w-full"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAddDays} 
                      className="w-full calculator-button"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi Giorni
                    </Button>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    {addResult && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Risultato</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              {addResult.resultDate}
                            </div>
                            <div className="text-lg text-muted-foreground">
                              Data risultante
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Dettagli del Calcolo:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Data base:</span>
                                <span className="font-medium">{addResult.originalDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Giorni aggiunti:</span>
                                <span className="font-medium">{addResult.days}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Data risultante:</span>
                                <span className="font-medium">{addResult.resultDate}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subtract">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Minus className="h-5 w-5" />
                      Sottrai Giorni da una Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Data Base
                        </label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Giorni da Sottrarre
                        </label>
                        <Input
                          type="number"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          placeholder="Es: 15"
                          className="w-full"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSubtractDays} 
                      className="w-full calculator-button"
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Sottrai Giorni
                    </Button>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    {subtractResult && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Risultato</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600 mb-2">
                              {subtractResult.resultDate}
                            </div>
                            <div className="text-lg text-muted-foreground">
                              Data risultante
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Dettagli del Calcolo:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Data base:</span>
                                <span className="font-medium">{subtractResult.originalDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Giorni sottratti:</span>
                                <span className="font-medium">{subtractResult.days}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Data risultante:</span>
                                <span className="font-medium">{subtractResult.resultDate}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
