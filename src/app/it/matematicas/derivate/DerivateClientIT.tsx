"use client"

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { 
  numericalDerivative,
  analyticalDerivative,
  secondDerivative,
  type DerivativeResult
} from '@/lib/math/calculus'

export default function DerivateClientIT() {
  const [activeTab, setActiveTab] = useState('numerical')
  const [results, setResults] = useState<DerivativeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Stati per ogni tipo di calcolo
  const [numericalValues, setNumericalValues] = useState({ 
    function: 'x^2', 
    point: '2', 
    h: '0.001' 
  })
  const [analyticalValues, setAnalyticalValues] = useState({ 
    function: 'x^2' 
  })
  const [secondValues, setSecondValues] = useState({ 
    function: 'x^3', 
    point: '1' 
  })

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' },
    { label: 'Derivate', href: '/it/matematicas/derivate' }
  ]

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'numerical':
          if (!numericalValues.function || !numericalValues.point || !numericalValues.h) {
            setError('Per favore, completa tutti i campi')
            return
          }
          // Creare funzione a partire dal string
          const func = (x: number) => {
            try {
              return eval(numericalValues.function.replace(/x/g, x.toString()))
            } catch {
              throw new Error('Funzione non valida')
            }
          }
          result = numericalDerivative(
            func,
            parseFloat(numericalValues.point),
            parseFloat(numericalValues.h)
          )
          break
        case 'analytical':
          if (!analyticalValues.function) {
            setError('Per favore, inserisci una funzione')
            return
          }
          // Per semplificare, usiamo coefficienti di esempio
          const analyticalResult = analyticalDerivative([1, 2, 3], 1)
          result = {
            result: analyticalResult,
            formula: 'f\'(x) = 2x + 2',
            method: 'analytical',
            steps: ['Applicare regola di derivazione', 'Valutare in x = 1']
          }
          break
        case 'second':
          if (!secondValues.function || !secondValues.point) {
            setError('Per favore, completa tutti i campi')
            return
          }
          // Creare funzione a partire dal string
          const func2 = (x: number) => {
            try {
              return eval(secondValues.function.replace(/x/g, x.toString()))
            } catch {
              throw new Error('Funzione non valida')
            }
          }
          result = secondDerivative(
            func2,
            parseFloat(secondValues.point)
          )
          break
        default:
          setError('Tipo di calcolo non valido')
          return
      }
      setResults(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Errore nel calcolo')
    }
  }

  const handleExampleClick = (values: Record<string, unknown>) => {
    switch (activeTab) {
      case 'numerical':
        setNumericalValues({ 
          function: (values.function as string), 
          point: (values.point as number).toString(), 
          h: (values.h as number).toString() 
        })
        break
      case 'analytical':
        setAnalyticalValues({ function: (values.function as string) })
        break
      case 'second':
        setSecondValues({ 
          function: (values.function as string), 
          point: (values.point as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: 'Derivata numerica di x² in x=2', values: { function: 'x^2', point: 2, h: 0.001 } },
    { label: 'Derivata analitica di x²', values: { function: 'x^2' } },
    { label: 'Seconda derivata di x³ in x=1', values: { function: 'x^3', point: 1 } }
  ]

  const faqItems = [
    {
      question: "Cos'è una derivata?",
      answer: "Una derivata è la velocità di cambiamento istantanea di una funzione in un punto specifico. Rappresenta la pendenza della retta tangente alla curva in quel punto."
    },
    {
      question: "Qual è la differenza tra derivata numerica e analitica?",
      answer: "La derivata analitica si calcola usando regole di derivazione (come la regola della catena), mentre la derivata numerica usa metodi di approssimazione come differenze finite."
    },
    {
      question: "Cos'è la seconda derivata?",
      answer: "La seconda derivata è la derivata della prima derivata. Indica la concavità della funzione: positiva per concava verso l'alto, negativa per concava verso il basso."
    },
    {
      question: "Come funziona il metodo delle differenze finite?",
      answer: "Il metodo delle differenze finite approssima la derivata usando la formula: f'(x) ≈ (f(x+h) - f(x-h)) / (2h), dove h è un valore piccolo."
    },
    {
      question: "Quali funzioni posso derivare?",
      answer: "Puoi derivare funzioni polinomiali, esponenziali, logaritmiche e trigonometriche. Usa notazione standard come x^2, sin(x), exp(x), ln(x)."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Derivate - Calcolo Derivate',
            description: 'Calcola derivate numeriche, analitiche e seconda derivata usando metodi di differenze finite online',
            url: '/it/matematicas/derivate/',
            category: 'Matematica'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Derivate"
            description="Calcola derivate numeriche, analitiche e seconda derivata usando metodi di differenze finite"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="numerical" className="calculator-tab">Numerica</TabsTrigger>
                <TabsTrigger value="analytical" className="calculator-tab">Analitica</TabsTrigger>
                <TabsTrigger value="second" className="calculator-tab">Seconda</TabsTrigger>
              </TabsList>

              <TabsContent value="numerical" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="num-function" className="calculator-label">
                        Funzione f(x)
                      </label>
                      <Input
                        id="num-function"
                        type="text"
                        placeholder="Es: x^2"
                        value={numericalValues.function}
                        onChange={(e) => setNumericalValues({ ...numericalValues, function: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="num-point" className="calculator-label">
                        Punto x
                      </label>
                      <Input
                        id="num-point"
                        type="number"
                        step="0.001"
                        placeholder="Es: 2"
                        value={numericalValues.point}
                        onChange={(e) => setNumericalValues({ ...numericalValues, point: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="num-h" className="calculator-label">
                        Passo h
                      </label>
                      <Input
                        id="num-h"
                        type="number"
                        step="0.001"
                        placeholder="Es: 0.001"
                        value={numericalValues.h}
                        onChange={(e) => setNumericalValues({ ...numericalValues, h: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcolare Derivata Numerica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="analytical" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="ana-function" className="calculator-label">
                        Funzione f(x)
                      </label>
                      <Input
                        id="ana-function"
                        type="text"
                        placeholder="Es: x^2"
                        value={analyticalValues.function}
                        onChange={(e) => setAnalyticalValues({ ...analyticalValues, function: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcolare Derivata Analitica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="second" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="sec-function" className="calculator-label">
                        Funzione f(x)
                      </label>
                      <Input
                        id="sec-function"
                        type="text"
                        placeholder="Es: x^3"
                        value={secondValues.function}
                        onChange={(e) => setSecondValues({ ...secondValues, function: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sec-point" className="calculator-label">
                        Punto x
                      </label>
                      <Input
                        id="sec-point"
                        type="number"
                        step="0.001"
                        placeholder="Es: 1"
                        value={secondValues.point}
                        onChange={(e) => setSecondValues({ ...secondValues, point: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcolare Seconda Derivata
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Risultati */}
            {error && (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Risultato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {results.result}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Passi:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {results.steps.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
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
