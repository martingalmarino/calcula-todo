"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateOvulation, OvulationResult } from '@/lib/math/health'

export default function OvulazioneClientIT() {
  const [lastPeriod, setLastPeriod] = useState('')
  const [cycleLength, setCycleLength] = useState('')
  const [result, setResult] = useState<OvulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const cycleLengthNum = parseInt(cycleLength)
    
    if (!lastPeriod || !cycleLength) {
      setError('Inserisci sia la data dell\'ultimo ciclo che la durata del ciclo')
      return
    }
    
    if (cycleLengthNum < 21 || cycleLengthNum > 35) {
      setError('La durata del ciclo deve essere tra 21 e 35 giorni')
      return
    }
    
    try {
      const ovulationResult = calculateOvulation(lastPeriod, cycleLengthNum)
      setResult(ovulationResult)
    } catch {
      setError('Errore nel calcolo dell\'ovulazione')
    }
  }

  const handleExample = (example: string) => {
    const examples: { [key: string]: { lastPeriod: string; cycleLength: string } } = {
      'ciclo_28': { lastPeriod: '2024-01-01', cycleLength: '28' },
      'ciclo_30': { lastPeriod: '2024-01-01', cycleLength: '30' },
      'ciclo_26': { lastPeriod: '2024-01-01', cycleLength: '26' },
      'ciclo_32': { lastPeriod: '2024-01-01', cycleLength: '32' }
    }
    
    const exampleData = examples[example]
    if (exampleData) {
      setLastPeriod(exampleData.lastPeriod)
      setCycleLength(exampleData.cycleLength)
    }
  }

  const examples = [
    { label: 'Ciclo 28 giorni', value: 'ciclo_28', description: 'Ciclo regolare di 28 giorni' },
    { label: 'Ciclo 30 giorni', value: 'ciclo_30', description: 'Ciclo di 30 giorni' },
    { label: 'Ciclo 26 giorni', value: 'ciclo_26', description: 'Ciclo corto di 26 giorni' },
    { label: 'Ciclo 32 giorni', value: 'ciclo_32', description: 'Ciclo lungo di 32 giorni' }
  ]

  const faqItems = [
    {
      question: 'Come funziona il calcolo dell\'ovulazione?',
      answer: 'L\'ovulazione avviene generalmente 14 giorni prima della fine del ciclo mestruale. Il calcolo si basa sulla data dell\'ultimo ciclo e sulla durata media del ciclo.'
    },
    {
      question: 'Quali sono i giorni più fertili?',
      answer: 'I giorni più fertili sono generalmente i 5 giorni prima dell\'ovulazione e il giorno dell\'ovulazione stesso. L\'ovulo vive per 12-24 ore dopo l\'ovulazione.'
    },
    {
      question: 'Il calcolo è sempre accurato?',
      answer: 'Il calcolo fornisce una stima basata su cicli regolari. Fattori come stress, malattia, cambiamenti di peso possono influenzare l\'ovulazione. Per una pianificazione familiare accurata, consulta un ginecologo.'
    },
    {
      question: 'Cosa devo fare se il mio ciclo è irregolare?',
      answer: 'Se il tuo ciclo è irregolare, il calcolo potrebbe essere meno accurato. Considera di monitorare i sintomi dell\'ovulazione (muco cervicale, temperatura basale) o consulta un ginecologo.'
    }
  ]

  return (
    <CalculatorLayout
      title="Calcolatrice di Ovulazione"
      description="Calcola i giorni fertili e il periodo di ovulazione per la pianificazione familiare"
      examples={examples}
      onExampleClick={handleExample}
      faqItems={faqItems}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lastPeriod" className="block text-sm font-medium text-gray-700 mb-2">
              Data Ultimo Ciclo
            </label>
            <Input
              id="lastPeriod"
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cycleLength" className="block text-sm font-medium text-gray-700 mb-2">
              Durata Ciclo (giorni)
            </label>
            <Input
              id="cycleLength"
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="Es. 28"
              min="21"
              max="35"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calcola Ovulazione
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato Calcolo Ovulazione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {result.nextOvulation}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Giorno di Ovulazione
                </div>
                <div className="text-gray-600 mb-4">
                  Calcolo basato sul ciclo mestruale
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Periodo Fertile:</h4>
                <p className="text-blue-800">Dal {result.fertileWindow.start} al {result.fertileWindow.end}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Ultimo ciclo:</span>
                  <span className="font-medium">{lastPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Durata ciclo:</span>
                  <span className="font-medium">{cycleLength} giorni</span>
                </div>
                <div className="flex justify-between">
                  <span>Giorno ovulazione:</span>
                  <span className="font-medium">{result.nextOvulation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prossimo ciclo:</span>
                  <span className="font-medium">{result.nextPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Durata ciclo:</span>
                  <span className="font-medium">{result.cycleLength} giorni</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Avviso Importante:</h4>
                <p className="text-yellow-800 text-sm">
                  Questo calcolo è solo indicativo e si basa su cicli regolari. Per una pianificazione familiare accurata, 
                  consulta sempre un ginecologo e considera di monitorare i sintomi dell&apos;ovulazione.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  )
}
