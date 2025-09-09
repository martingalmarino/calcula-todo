"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculatePaFi, PaFiResult } from '@/lib/math/health'

export default function PafiClientIT() {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [heartRate, setHeartRate] = useState('')
  const [result, setResult] = useState<PaFiResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const systolicNum = parseInt(systolic)
    const diastolicNum = parseInt(diastolic)
    const heartRateNum = parseInt(heartRate)
    
    if (!systolic || !diastolic || !heartRate) {
      setError('Inserisci tutti i valori richiesti')
      return
    }
    
    if (systolicNum <= 0 || diastolicNum <= 0 || heartRateNum <= 0) {
      setError('Tutti i valori devono essere positivi')
      return
    }
    
    if (systolicNum < 70 || systolicNum > 250) {
      setError('La pressione sistolica deve essere tra 70 e 250 mmHg')
      return
    }
    
    if (diastolicNum < 40 || diastolicNum > 150) {
      setError('La pressione diastolica deve essere tra 40 e 150 mmHg')
      return
    }
    
    if (heartRateNum < 40 || heartRateNum > 200) {
      setError('La frequenza cardiaca deve essere tra 40 e 200 bpm')
      return
    }
    
    if (systolicNum <= diastolicNum) {
      setError('La pressione sistolica deve essere maggiore della diastolica')
      return
    }
    
    try {
      const pafiResult = calculatePaFi(systolicNum, diastolicNum, heartRateNum)
      setResult(pafiResult)
    } catch {
      setError('Errore nel calcolo dell\'indice PaFi')
    }
  }

  const handleExample = (example: string) => {
    const examples: { [key: string]: { systolic: string; diastolic: string; heartRate: string } } = {
      'normale': { systolic: '120', diastolic: '80', heartRate: '70' },
      'ipertensione': { systolic: '140', diastolic: '90', heartRate: '75' },
      'ipotensione': { systolic: '100', diastolic: '60', heartRate: '65' },
      'tachicardia': { systolic: '130', diastolic: '85', heartRate: '100' }
    }
    
    const exampleData = examples[example]
    if (exampleData) {
      setSystolic(exampleData.systolic)
      setDiastolic(exampleData.diastolic)
      setHeartRate(exampleData.heartRate)
    }
  }

  const examples = [
    { label: 'Pressione Normale', value: 'normale', description: '120/80 mmHg, 70 bpm' },
    { label: 'Ipertensione', value: 'ipertensione', description: '140/90 mmHg, 75 bpm' },
    { label: 'Ipotensione', value: 'ipotensione', description: '100/60 mmHg, 65 bpm' },
    { label: 'Tachicardia', value: 'tachicardia', description: '130/85 mmHg, 100 bpm' }
  ]

  const faqItems = [
    {
      question: 'Cos\'è l\'indice PaFi?',
      answer: 'L\'indice PaFi (Pressione arteriosa/Frequenza cardiaca) è un indicatore che valuta la funzione cardiovascolare combinando pressione arteriosa e frequenza cardiaca.'
    },
    {
      question: 'Come viene calcolato?',
      answer: 'L\'indice PaFi si calcola dividendo la pressione arteriosa media (PAM) per la frequenza cardiaca. La PAM si calcola come: (pressione sistolica + 2 × pressione diastolica) / 3.'
    },
    {
      question: 'Cosa indicano i valori?',
      answer: 'Valori normali dell\'indice PaFi sono generalmente tra 0.8 e 1.2. Valori più alti possono indicare ipertensione, mentre valori più bassi possono suggerire ipotensione o tachicardia.'
    },
    {
      question: 'È un indicatore diagnostico?',
      answer: 'L\'indice PaFi è un indicatore di screening, non un test diagnostico. Per una valutazione completa della salute cardiovascolare, consulta sempre un medico.'
    }
  ]

  return (
    <CalculatorLayout
      title="Calcolatrice PaFi"
      description="Calcola l'indice PaFi per valutare la funzione cardiovascolare"
      examples={examples}
      onExampleClick={handleExample}
      faqItems={faqItems}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700 mb-2">
              Pressione Sistolica (mmHg)
            </label>
            <Input
              id="systolic"
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="Es. 120"
              min="70"
              max="250"
            />
          </div>
          <div>
            <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700 mb-2">
              Pressione Diastolica (mmHg)
            </label>
            <Input
              id="diastolic"
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="Es. 80"
              min="40"
              max="150"
            />
          </div>
          <div>
            <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 mb-2">
              Frequenza Cardiaca (bpm)
            </label>
            <Input
              id="heartRate"
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="Es. 70"
              min="40"
              max="200"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calcola Indice PaFi
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato Indice PaFi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.pafi.toFixed(2)}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {result.category}
                </div>
                <div className="text-gray-600 mb-4">
                  {result.description}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informazioni:</h4>
                <p className="text-blue-800">{result.interpretation}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Pressione sistolica:</span>
                  <span className="font-medium">{systolic} mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span>Pressione diastolica:</span>
                  <span className="font-medium">{diastolic} mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequenza cardiaca:</span>
                  <span className="font-medium">{heartRate} bpm</span>
                </div>
                <div className="flex justify-between">
                  <span>Indice PaFi:</span>
                  <span className="font-medium">{result.pafi.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valutazione:</span>
                  <span className="font-medium">{result.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  )
}
