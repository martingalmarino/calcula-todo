"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Scale, AlertCircle } from 'lucide-react'
import { calculateIMC, IMCResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

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

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.height) setHeight(example.height as string)
  }

  const examples = [
    { label: 'Peso Normale', values: { weight: '70', height: '175' } },
    { label: 'Sottopeso', values: { weight: '50', height: '175' } },
    { label: 'Sovrappeso', values: { weight: '85', height: '175' } },
    { label: 'Obeso', values: { weight: '100', height: '175' } }
  ]

  const breadcrumbs = getBreadcrumbs('/it/salute/imc')

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice IMC - Indice di Massa Corporea',
            description: 'Calcola il tuo Indice di Massa Corporea e scopri la tua categoria di peso ideale',
            url: '/it/salute/imc/',
            category: 'Salute'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice IMC - Indice di Massa Corporea"
            description="Calcola il tuo Indice di Massa Corporea e scopri la tua categoria di peso ideale"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExample}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Calcolatrice IMC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Peso (kg)
                    </label>
                    <Input
                      type="number"
                      placeholder="Es: 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Altezza (cm)
                    </label>
                    <Input
                      type="number"
                      placeholder="Es: 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Calcola IMC
                </Button>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
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
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
