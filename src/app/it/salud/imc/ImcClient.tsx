"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Scale, AlertCircle } from 'lucide-react'
import { calculateIMC, type IMCResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'

export default function IMCClientIT() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [results, setResults] = useState<IMCResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!weight || !height) {
      setError('Per favore, inserisci il tuo peso e altezza')
      return
    }

    try {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      
      if (isNaN(weightNum) || isNaN(heightNum)) {
        setError('Per favore, inserisci valori numerici validi')
        return
      }

      const result = calculateIMC(weightNum, heightNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo dell\'IMC')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Salute', href: '/it/salud' },
    { label: 'IMC', href: '/it/salud/imc' }
  ]

  const examples = [
    {
      label: 'Esempio: Persona di 70kg e 175cm',
      values: { weight: '70', height: '175' }
    },
    {
      label: 'Esempio: Persona di 60kg e 165cm',
      values: { weight: '60', height: '165' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è l\'IMC?',
      answer: 'L\'Indice di Massa Corporea (IMC) è una misura che mette in relazione il peso con l\'altezza per valutare se una persona ha un peso sano.'
    },
    {
      question: 'Come si calcola l\'IMC?',
      answer: 'L\'IMC si calcola dividendo il peso (in kg) per l\'altezza al quadrato (in metri): IMC = peso / (altezza)²'
    },
    {
      question: 'Quali sono le categorie dell\'IMC?',
      answer: 'Sottopeso: < 18.5, Normale: 18.5-24.9, Sovrappeso: 25-29.9, Obesità: ≥ 30'
    },
    {
      question: 'L\'IMC è preciso per tutti?',
      answer: 'L\'IMC è uno strumento utile ma non considera la composizione corporea. Gli atleti con molta massa muscolare possono avere un IMC elevato senza essere obesi.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice IMC - Indice di Massa Corporea',
            description: 'Calcola il tuo Indice di Massa Corporea e scopri la tua categoria di peso ideale',
            url: '/it/salud/imc/',
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
            onExampleClick={(values) => {
              setWeight(values.weight as string)
              setHeight(values.height as string)
            }}
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
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Calcola IMC
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
                        <div className="text-3xl font-bold text-red-600 mb-2">
                          {results.imc}
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {results.category}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {results.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {results.recommendation}
                        </p>
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
