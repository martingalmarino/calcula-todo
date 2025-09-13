"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DollarSign, AlertCircle, Users, Percent, Receipt } from 'lucide-react'
import { calculateTip, type TipCalculationResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalcolatriceManceClientIT() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState('15')
  const [peopleCount, setPeopleCount] = useState('1')
  const [results, setResults] = useState<TipCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!billAmount) {
      setError('Inserisci l\'importo del conto')
      return
    }

    try {
      const billNum = parseFloat(billAmount)
      const tipNum = parseFloat(tipPercentage)
      const peopleNum = parseInt(peopleCount)
      
      if (isNaN(billNum) || isNaN(tipNum) || isNaN(peopleNum)) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = calculateTip(billNum, tipNum, peopleNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo della mancia')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Altre Calcolatrici', href: '/it/altre' },
    { label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance' }
  ]

  const examples = [
    {
      label: 'Conto di €50 con mancia 15% per 2 persone',
      values: { billAmount: '50', tipPercentage: '15', peopleCount: '2' }
    },
    {
      label: 'Conto di €120 con mancia 20% per 4 persone',
      values: { billAmount: '120', tipPercentage: '20', peopleCount: '4' }
    },
    {
      label: 'Conto di €25 con mancia 10% per 1 persona',
      values: { billAmount: '25', tipPercentage: '10', peopleCount: '1' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual è la percentuale di mancia standard?',
      answer: 'La mancia standard varia per paese. In Italia è comune il 10-15%, mentre negli Stati Uniti è tipicamente 15-20%.'
    },
    {
      question: 'Come divido il conto tra più persone?',
      answer: 'La calcolatrice divide automaticamente il totale (conto + mancia) per il numero di persone specificato.'
    },
    {
      question: 'La mancia è obbligatoria?',
      answer: 'Dipende dal paese e dalla cultura. In alcuni luoghi è obbligatoria, in altri è opzionale ma apprezzata.'
    },
    {
      question: 'Come calcolo la mancia per un servizio eccellente?',
      answer: 'Per un servizio eccellente, considera una mancia del 20-25%. Per un servizio standard, 15% è appropriato.'
    }
  ]

  const relatedLinks = [
    { label: 'Scala di Voti', href: '/it/altre/scala-di-voti', description: 'Converte punteggi in lettere' },
    { label: 'Spesa Benzina per Viaggi', href: '/it/altre/spesa-benzina-viaggi', description: 'Calcola il costo del carburante' },
    { label: 'Contatore di Parole', href: '/it/altre/contatore-parole-caratteri', description: 'Conta parole e caratteri' }
  ]

  const quickTipButtons = [
    { label: '10%', value: '10' },
    { label: '15%', value: '15' },
    { label: '18%', value: '18' },
    { label: '20%', value: '20' },
    { label: '25%', value: '25' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Mance',
            description: 'Calcola la mancia appropriata per il servizio',
            url: '/it/altre/calcolatrice-mance/',
            category: 'Servizio'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Mance"
            description="Calcola la mancia appropriata per il servizio"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={(values) => {
              setBillAmount(values.billAmount as string)
              setTipPercentage(values.tipPercentage as string)
              setPeopleCount(values.peopleCount as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Calcolatrice di Mance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Importo del Conto (€)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 50.00"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Percentuale Mancia (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Es: 15"
                      value={tipPercentage}
                      onChange={(e) => setTipPercentage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Numero di Persone
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Es: 2"
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Percentuali Rapide:
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {quickTipButtons.map((button) => (
                      <Button
                        key={button.value}
                        variant={tipPercentage === button.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTipPercentage(button.value)}
                        className="text-xs"
                      >
                        {button.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Calcola Mancia
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
                      <CardTitle className="text-lg">Risultato del Calcolo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          €{results.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          Totale da Pagare
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Receipt className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Importo Conto</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            €{results.billAmount.toFixed(2)}
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Percent className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Mancia</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            €{results.tipAmount.toFixed(2)}
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Per Persona</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">
                            €{results.perPersonAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Calcolo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Importo Conto:</span>
                            <span className="font-medium">€{results.billAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Percentuale Mancia:</span>
                            <span className="font-medium">{results.tipPercentage}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Importo Mancia:</span>
                            <span className="font-medium">€{results.tipAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale:</span>
                            <span className="font-medium">€{results.totalAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Numero Persone:</span>
                            <span className="font-medium">{results.peopleCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Per Persona:</span>
                            <span className="font-medium">€{results.perPersonAmount.toFixed(2)}</span>
                          </div>
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
