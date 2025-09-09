"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Plus, Minus, AlertCircle } from 'lucide-react'
import { calculateTimeOperation, type TimeCalculationResult } from '@/lib/math/calendar'
import { jsonLdCalculator } from '@/lib/seo'

export default function OreMinutiClientIT() {
  const [hours1, setHours1] = useState('')
  const [minutes1, setMinutes1] = useState('')
  const [hours2, setHours2] = useState('')
  const [minutes2, setMinutes2] = useState('')
  const [totalMinutes, setTotalMinutes] = useState('')
  const [result, setResult] = useState<TimeCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddTime = () => {
    setError(null)
    
    if (!hours1 || !minutes1 || !hours2 || !minutes2) {
      setError('Per favore, completa tutti i campi')
      return
    }

    try {
      const h1 = parseInt(hours1)
      const m1 = parseInt(minutes1)
      const h2 = parseInt(hours2)
      const m2 = parseInt(minutes2)

      if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) {
        setError('Per favore, inserisci valori numerici validi')
        return
      }

      const time1 = `${h1.toString().padStart(2, '0')}:${m1.toString().padStart(2, '0')}`
      const time2 = `${h2.toString().padStart(2, '0')}:${m2.toString().padStart(2, '0')}`
      
      const result = calculateTimeOperation(time1, time2, 'add')
      setResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo del tempo')
    }
  }

  const handleSubtractTime = () => {
    setError(null)
    
    if (!hours1 || !minutes1 || !hours2 || !minutes2) {
      setError('Per favore, completa tutti i campi')
      return
    }

    try {
      const h1 = parseInt(hours1)
      const m1 = parseInt(minutes1)
      const h2 = parseInt(hours2)
      const m2 = parseInt(minutes2)

      if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) {
        setError('Per favore, inserisci valori numerici validi')
        return
      }

      const time1 = `${h1.toString().padStart(2, '0')}:${m1.toString().padStart(2, '0')}`
      const time2 = `${h2.toString().padStart(2, '0')}:${m2.toString().padStart(2, '0')}`
      
      const result = calculateTimeOperation(time1, time2, 'subtract')
      setResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo del tempo')
    }
  }

  const handleConvertTime = () => {
    setError(null)
    
    if (!totalMinutes) {
      setError('Per favore, inserisci i minuti totali')
      return
    }

    try {
      const minutes = parseInt(totalMinutes)
      if (isNaN(minutes) || minutes < 0) {
        setError('Per favore, inserisci un numero valido di minuti')
        return
      }

      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      
      const result: TimeCalculationResult = {
        hours,
        minutes: remainingMinutes,
        totalMinutes: minutes,
        totalHours: Math.round((minutes / 60) * 100) / 100,
        breakdown: {
          operation: 'Conversione',
          time1: `${minutes} minuti`,
          time2: ''
        }
      }
      setResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nella conversione del tempo')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' },
    { label: 'Calcolatrice di Ore e Minuti', href: '/it/calendario/ore-minuti' }
  ]

  const examples = [
    {
      label: 'Esempio: Somma 2h 30min + 1h 45min',
      values: { hours1: '2', minutes1: '30', hours2: '1', minutes2: '45' }
    },
    {
      label: 'Esempio: Converti 150 minuti',
      values: { totalMinutes: '150' }
    }
  ]

  const faqItems = [
    {
      question: 'Come funziona la somma di ore e minuti?',
      answer: 'Somma due tempi specificati in ore e minuti, gestendo automaticamente il riporto quando i minuti superano 60.'
    },
    {
      question: 'Come funziona la sottrazione di ore e minuti?',
      answer: 'Sottrae il secondo tempo dal primo, gestendo automaticamente il prestito quando necessario.'
    },
    {
      question: 'Come funziona la conversione di minuti?',
      answer: 'Converte un numero totale di minuti in ore e minuti, mostrando il risultato in formato leggibile.'
    },
    {
      question: 'Posso usare valori negativi?',
      answer: 'No, tutti i valori devono essere positivi. La calcolatrice gestisce automaticamente i calcoli interni.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Ore e Minuti - Calcolo Tempo',
            description: 'Calcola, somma e converti ore e minuti facilmente per calcoli di tempo e durata',
            url: '/it/calendario/ore-minuti/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Ore e Minuti - Calcolo Tempo"
            description="Calcola, somma e converti ore e minuti facilmente per calcoli di tempo e durata"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.hours1) {
                setHours1(values.hours1 as string)
                setMinutes1(values.minutes1 as string)
                setHours2(values.hours2 as string)
                setMinutes2(values.minutes2 as string)
              } else if (values.totalMinutes) {
                setTotalMinutes(values.totalMinutes as string)
              }
            }}
          >
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="add" className="calculator-tab">
                  <Plus className="h-4 w-4 mr-2" />
                  Somma
                </TabsTrigger>
                <TabsTrigger value="subtract" className="calculator-tab">
                  <Minus className="h-4 w-4 mr-2" />
                  Sottrai
                </TabsTrigger>
                <TabsTrigger value="convert" className="calculator-tab">
                  <Clock className="h-4 w-4 mr-2" />
                  Converti
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Somma Ore e Minuti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ore 1
                        </label>
                        <Input
                          type="number"
                          value={hours1}
                          onChange={(e) => setHours1(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Minuti 1
                        </label>
                        <Input
                          type="number"
                          value={minutes1}
                          onChange={(e) => setMinutes1(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                          max="59"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ore 2
                        </label>
                        <Input
                          type="number"
                          value={hours2}
                          onChange={(e) => setHours2(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Minuti 2
                        </label>
                        <Input
                          type="number"
                          value={minutes2}
                          onChange={(e) => setMinutes2(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                          max="59"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAddTime} 
                      className="w-full calculator-button"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Somma Tempi
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subtract">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Minus className="h-5 w-5" />
                      Sottrai Ore e Minuti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ore 1
                        </label>
                        <Input
                          type="number"
                          value={hours1}
                          onChange={(e) => setHours1(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Minuti 1
                        </label>
                        <Input
                          type="number"
                          value={minutes1}
                          onChange={(e) => setMinutes1(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                          max="59"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ore 2
                        </label>
                        <Input
                          type="number"
                          value={hours2}
                          onChange={(e) => setHours2(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Minuti 2
                        </label>
                        <Input
                          type="number"
                          value={minutes2}
                          onChange={(e) => setMinutes2(e.target.value)}
                          placeholder="0"
                          className="w-full"
                          min="0"
                          max="59"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSubtractTime} 
                      className="w-full calculator-button"
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Sottrai Tempi
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="convert">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Converti Minuti in Ore e Minuti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Minuti Totali
                      </label>
                      <Input
                        type="number"
                        value={totalMinutes}
                        onChange={(e) => setTotalMinutes(e.target.value)}
                        placeholder="Es: 150"
                        className="w-full"
                        min="0"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleConvertTime} 
                      className="w-full calculator-button"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Converti
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 mt-4">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {result && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Risultato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.hours}h {result.minutes}min
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Tempo totale
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Dettagli del Calcolo:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ore:</span>
                        <span className="font-medium">{result.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minuti:</span>
                        <span className="font-medium">{result.minutes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minuti totali:</span>
                        <span className="font-medium">{result.totalMinutes}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
