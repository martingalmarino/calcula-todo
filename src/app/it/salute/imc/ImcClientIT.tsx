"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateIMC, IMCResult } from '@/lib/math/health'

export default function ImcClientIT() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<IMCResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    
    if (!weight || !height) {
      setError('Inserisci sia il peso che l\'altezza')
      return
    }
    
    if (weightNum <= 0 || heightNum <= 0) {
      setError('Peso e altezza devono essere valori positivi')
      return
    }
    
    if (heightNum < 100 || heightNum > 250) {
      setError('L\'altezza deve essere tra 100 e 250 cm')
      return
    }
    
    if (weightNum < 20 || weightNum > 300) {
      setError('Il peso deve essere tra 20 e 300 kg')
      return
    }
    
    try {
      const imcResult = calculateIMC(weightNum, heightNum, 'it')
      setResult(imcResult)
    } catch {
      setError('Errore nel calcolo dell\'IMC')
    }
  }

  const handleExample = (example: string) => {
    const examples: { [key: string]: { weight: string; height: string } } = {
      'normale': { weight: '70', height: '175' },
      'sottopeso': { weight: '50', height: '175' },
      'sovrappeso': { weight: '85', height: '175' },
      'obeso': { weight: '100', height: '175' }
    }
    
    const exampleData = examples[example]
    if (exampleData) {
      setWeight(exampleData.weight)
      setHeight(exampleData.height)
    }
  }

  const examples = [
    { label: 'Peso Normale', value: 'normale', description: '70 kg, 175 cm' },
    { label: 'Sottopeso', value: 'sottopeso', description: '50 kg, 175 cm' },
    { label: 'Sovrappeso', value: 'sovrappeso', description: '85 kg, 175 cm' },
    { label: 'Obeso', value: 'obeso', description: '100 kg, 175 cm' }
  ]

  const faqItems = [
    {
      question: 'Cos\'è l\'IMC?',
      answer: 'L\'Indice di Massa Corporea (IMC) è un indicatore del peso corporeo che mette in relazione peso e altezza. Si calcola dividendo il peso in chilogrammi per il quadrato dell\'altezza in metri.'
    },
    {
      question: 'Come interpretare i risultati dell\'IMC?',
      answer: 'L\'IMC si classifica in: sottopeso (<18.5), peso normale (18.5-24.9), sovrappeso (25-29.9) e obesità (≥30). Tuttavia, l\'IMC non considera la composizione corporea.'
    },
    {
      question: 'L\'IMC è accurato per tutti?',
      answer: 'L\'IMC è un indicatore generale ma non considera fattori come massa muscolare, età, sesso o composizione corporea. Atleti o persone molto muscolose potrebbero avere un IMC elevato pur essendo in salute.'
    },
    {
      question: 'Quando consultare un medico?',
      answer: 'Se il tuo IMC è fuori dal range normale o hai dubbi sulla tua salute, consulta sempre un medico o un nutrizionista per una valutazione completa.'
    }
  ]

  return (
    <CalculatorLayout
      title="Calcolatrice Indice di Massa Corporea (IMC)"
      description="Calcola il tuo indice di massa corporea per valutare se il tuo peso è ideale per la tua altezza"
      examples={examples}
      onExampleClick={handleExample}
      faqItems={faqItems}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Peso (kg)
            </label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Es. 70"
              min="20"
              max="300"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              Altezza (cm)
            </label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Es. 175"
              min="100"
              max="250"
              step="0.1"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calcola IMC
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato IMC</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.imc.toFixed(1)}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {result.category}
                </div>
                <div className="text-gray-600 mb-4">
                  {result.description}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Raccomandazione:</h4>
                <p className="text-blue-800">{result.recommendation}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Peso inserito:</span>
                  <span className="font-medium">{weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Altezza inserita:</span>
                  <span className="font-medium">{height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>IMC calcolato:</span>
                  <span className="font-medium">{result.imc.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Categoria:</span>
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
