"use client"

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { 
  sqrt,
  cbrt,
  root,
  pow,
  powerOfTen,
  toScientificNotation,
} from '@/lib/math/powerRoot'

export default function PotenzeRadiciClientIT() {
  const [activeTab, setActiveTab] = useState('square-root')
  const [results, setResults] = useState<{ result: number; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Stati per ogni tipo di calcolo
  const [squareRootValue, setSquareRootValue] = useState('')
  const [cubeRootValue, setCubeRootValue] = useState('')
  const [nthRootValues, setNthRootValues] = useState({ number: '', n: '' })
  const [powerValues, setPowerValues] = useState({ base: '', exponent: '' })
  const [powerOf10Value, setPowerOf10Value] = useState('')
  const [scientificValues, setScientificValues] = useState({ number: '', precision: '2' })

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' },
    { label: 'Potenze e Radici', href: '/it/matematicas/potenze-e-radici' }
  ]

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'square-root':
          if (!squareRootValue) {
            setError('Per favore, inserisci un numero')
            return
          }
          const num = parseFloat(squareRootValue)
          if (num < 0) {
            setError('Non è possibile calcolare la radice quadrata di un numero negativo')
            return
          }
          result = sqrt(num)
          break
        case 'cube-root':
          if (!cubeRootValue) {
            setError('Per favore, inserisci un numero')
            return
          }
          result = cbrt(parseFloat(cubeRootValue))
          break
        case 'nth-root':
          if (!nthRootValues.number || !nthRootValues.n) {
            setError('Per favore, completa tutti i campi')
            return
          }
          const number = parseFloat(nthRootValues.number)
          const n = parseInt(nthRootValues.n)
          if (n <= 0) {
            setError('L\'indice deve essere un numero positivo')
            return
          }
          if (number < 0 && n % 2 === 0) {
            setError('Non è possibile calcolare la radice pari di un numero negativo')
            return
          }
          result = root(number, n)
          break
        case 'power':
          if (!powerValues.base || !powerValues.exponent) {
            setError('Per favore, completa tutti i campi')
            return
          }
          result = pow(parseFloat(powerValues.base), parseFloat(powerValues.exponent))
          break
        case 'power-of-10':
          if (!powerOf10Value) {
            setError('Per favore, inserisci un esponente')
            return
          }
          result = powerOfTen(parseInt(powerOf10Value))
          break
        case 'scientific':
          if (!scientificValues.number) {
            setError('Per favore, inserisci un numero')
            return
          }
          const precision = parseInt(scientificValues.precision) || 2
          if (precision < 0 || precision > 10) {
            setError('La precisione deve essere tra 0 e 10')
            return
          }
          const notation = toScientificNotation(parseFloat(scientificValues.number))
          result = { result: notation.coefficient * Math.pow(10, notation.exponent), steps: [notation.notation] }
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
      case 'square-root':
        setSquareRootValue((values.number as number).toString())
        break
      case 'cube-root':
        setCubeRootValue((values.number as number).toString())
        break
      case 'nth-root':
        setNthRootValues({ 
          number: (values.number as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'power':
        setPowerValues({ 
          base: (values.base as number).toString(), 
          exponent: (values.exponent as number).toString() 
        })
        break
      case 'power-of-10':
        setPowerOf10Value((values.exponent as number).toString())
        break
      case 'scientific':
        setScientificValues({ 
          number: (values.number as number).toString(), 
          precision: (values.precision as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: '√16', values: { number: 16 } },
    { label: '∛27', values: { number: 27 } },
    { label: '⁴√81', values: { number: 81, n: 4 } },
    { label: '2³', values: { base: 2, exponent: 3 } },
    { label: '10⁵', values: { exponent: 5 } },
    { label: 'Notazione scientifica di 1234', values: { number: 1234, precision: 2 } }
  ]

  const faqItems = [
    {
      question: "Cos'è una radice quadrata?",
      answer: "La radice quadrata di un numero x è il numero che, moltiplicato per se stesso, dà x. Si indica come √x. Ad esempio: √16 = 4 perché 4 × 4 = 16."
    },
    {
      question: "Cos'è una radice cubica?",
      answer: "La radice cubica di un numero x è il numero che, elevato al cubo, dà x. Si indica come ∛x. Ad esempio: ∛27 = 3 perché 3³ = 27."
    },
    {
      question: "Cos'è una radice n-esima?",
      answer: "La radice n-esima di un numero x è il numero che, elevato alla potenza n, dà x. Si indica come ⁿ√x. Ad esempio: ⁴√81 = 3 perché 3⁴ = 81."
    },
    {
      question: "Cos'è la notazione scientifica?",
      answer: "La notazione scientifica è un modo di scrivere numeri molto grandi o molto piccoli usando potenze di 10. Si esprime come a × 10ⁿ, dove 1 ≤ |a| < 10."
    },
    {
      question: "Quali sono le regole degli esponenti?",
      answer: "Le regole principali sono: xᵃ × xᵇ = xᵃ⁺ᵇ, xᵃ ÷ xᵇ = xᵃ⁻ᵇ, (xᵃ)ᵇ = xᵃᵇ, x⁰ = 1, x⁻ᵃ = 1/xᵃ."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Potenze e Radici - Operazioni con Potenze e Radici',
            description: 'Calcola potenze, radici quadrate, cubiche, n-esime e notazione scientifica online',
            url: '/it/matematicas/potenze-e-radici/',
            category: 'Matematica'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Potenze e Radici"
            description="Calcola potenze, radici quadrate, cubiche, n-esime e notazione scientifica"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="square-root" className="calculator-tab">Radice Quadrata</TabsTrigger>
                <TabsTrigger value="cube-root" className="calculator-tab">Radice Cubica</TabsTrigger>
                <TabsTrigger value="nth-root" className="calculator-tab">Radice n-esima</TabsTrigger>
                <TabsTrigger value="power" className="calculator-tab">Potenza</TabsTrigger>
                <TabsTrigger value="power-of-10" className="calculator-tab">Potenza di 10</TabsTrigger>
                <TabsTrigger value="scientific" className="calculator-tab">Notazione Scientifica</TabsTrigger>
              </TabsList>

              <TabsContent value="square-root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="sqrt-number" className="calculator-label">
                        Numero
                      </label>
                      <Input
                        id="sqrt-number"
                        type="number"
                        step="0.001"
                        min="0"
                        placeholder="Es: 16"
                        value={squareRootValue}
                        onChange={(e) => setSquareRootValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcolare Radice Quadrata
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cube-root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="cbrt-number" className="calculator-label">
                        Numero
                      </label>
                      <Input
                        id="cbrt-number"
                        type="number"
                        step="0.001"
                        placeholder="Es: 27"
                        value={cubeRootValue}
                        onChange={(e) => setCubeRootValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcolare Radice Cubica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="nth-root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="nth-number" className="calculator-label">
                        Numero
                      </label>
                      <Input
                        id="nth-number"
                        type="number"
                        step="0.001"
                        placeholder="Es: 81"
                        value={nthRootValues.number}
                        onChange={(e) => setNthRootValues({ ...nthRootValues, number: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="nth-n" className="calculator-label">
                        Indice (n)
                      </label>
                      <Input
                        id="nth-n"
                        type="number"
                        min="1"
                        placeholder="Es: 4"
                        value={nthRootValues.n}
                        onChange={(e) => setNthRootValues({ ...nthRootValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcolare Radice n-esima
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="power" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="power-base" className="calculator-label">
                        Base
                      </label>
                      <Input
                        id="power-base"
                        type="number"
                        step="0.001"
                        placeholder="Es: 2"
                        value={powerValues.base}
                        onChange={(e) => setPowerValues({ ...powerValues, base: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="power-exponent" className="calculator-label">
                        Esponente
                      </label>
                      <Input
                        id="power-exponent"
                        type="number"
                        step="0.001"
                        placeholder="Es: 3"
                        value={powerValues.exponent}
                        onChange={(e) => setPowerValues({ ...powerValues, exponent: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcolare Potenza
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="power-of-10" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="power10-exponent" className="calculator-label">
                        Esponente
                      </label>
                      <Input
                        id="power10-exponent"
                        type="number"
                        placeholder="Es: 5"
                        value={powerOf10Value}
                        onChange={(e) => setPowerOf10Value(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcolare Potenza di 10
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="scientific" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="sci-number" className="calculator-label">
                        Numero
                      </label>
                      <Input
                        id="sci-number"
                        type="number"
                        step="0.001"
                        placeholder="Es: 1234"
                        value={scientificValues.number}
                        onChange={(e) => setScientificValues({ ...scientificValues, number: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sci-precision" className="calculator-label">
                        Precisione
                      </label>
                      <Input
                        id="sci-precision"
                        type="number"
                        min="0"
                        max="10"
                        placeholder="Es: 2"
                        value={scientificValues.precision}
                        onChange={(e) => setScientificValues({ ...scientificValues, precision: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Convertire a Notazione Scientifica
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
