"use client"

import { useState } from 'react'
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { 
  simplify,
  add,
  subtract,
  multiply,
  divide,
  toDecimal,
  fromDecimal,
  type FractionResult
} from '@/lib/math/fractions'

export default function FrazioniClientIT() {
  const [activeTab, setActiveTab] = useState('simplify')
  const [results, setResults] = useState<FractionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [simplifyInput, setSimplifyInput] = useState({ numerator: '', denominator: '' })
  const [operationInputs, setOperationInputs] = useState({
    num1: '', den1: '', num2: '', den2: ''
  })
  const [decimalInput, setDecimalInput] = useState('')

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' },
    { label: 'Frazioni', href: '/it/matematicas/frazioni' }
  ]

  const examples = [
    {
      label: 'Esempio: Semplifica 12/18',
      values: { numerator: '12', denominator: '18' }
    },
    {
      label: 'Esempio: Somma 1/4 + 1/3',
      values: { num1: '1', den1: '4', num2: '1', den2: '3' }
    }
  ]

  const faqItems = [
    {
      question: 'Come si semplifica una frazione?',
      answer: 'Per semplificare una frazione, devi trovare il massimo comun divisore (MCD) del numeratore e denominatore, poi dividere entrambi per questo numero.'
    },
    {
      question: 'Come si sommano le frazioni?',
      answer: 'Per sommare frazioni con denominatori diversi, devi prima trovare il minimo comune multiplo (mcm) dei denominatori, poi convertire le frazioni e sommare i numeratori.'
    },
    {
      question: 'Come si converte una frazione in decimale?',
      answer: 'Per convertire una frazione in decimale, dividi il numeratore per il denominatore usando la divisione lunga.'
    }
  ]

  const handleSimplify = () => {
    setError(null)
    try {
      const num = parseInt(simplifyInput.numerator)
      const den = parseInt(simplifyInput.denominator)
      
      if (isNaN(num) || isNaN(den) || den === 0) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = simplify(num, den)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  const handleOperation = (operation: 'add' | 'subtract' | 'multiply' | 'divide') => {
    setError(null)
    try {
      const num1 = parseInt(operationInputs.num1)
      const den1 = parseInt(operationInputs.den1)
      const num2 = parseInt(operationInputs.num2)
      const den2 = parseInt(operationInputs.den2)
      
      if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) {
        setError('Inserisci valori numerici validi')
        return
      }

      let result: FractionResult
      switch (operation) {
        case 'add':
          result = add(num1, den1, num2, den2)
          break
        case 'subtract':
          result = subtract(num1, den1, num2, den2)
          break
        case 'multiply':
          result = multiply(num1, den1, num2, den2)
          break
        case 'divide':
          result = divide(num1, den1, num2, den2)
          break
      }
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  const handleDecimalConversion = (type: 'toDecimal' | 'fromDecimal') => {
    setError(null)
    try {
      if (type === 'toDecimal') {
        const num = parseInt(operationInputs.num1)
        const den = parseInt(operationInputs.den1)
        
        if (isNaN(num) || isNaN(den) || den === 0) {
          setError('Inserisci valori numerici validi')
          return
        }
        
        const result = toDecimal(num, den)
        setResults({ decimal: result, numerator: num, denominator: den })
      } else {
        const decimal = parseFloat(decimalInput)
        
        if (isNaN(decimal)) {
          setError('Inserisci un numero decimale valido')
          return
        }
        
        const result = fromDecimal(decimal)
        setResults(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Frazioni - Operazioni con Frazioni',
            description: 'Calcola operazioni con frazioni: semplifica, somma, sottrai, moltiplica e dividi frazioni online',
            url: '/it/matematicas/frazioni/',
            category: 'Matematica'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Frazioni - Operazioni con Frazioni"
            description="Calcola operazioni con frazioni: semplifica, somma, sottrai, moltiplica e dividi frazioni online"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.numerator && values.denominator) {
                setSimplifyInput({ numerator: values.numerator as string, denominator: values.denominator as string })
                setActiveTab('simplify')
              } else if (values.num1 && values.den1 && values.num2 && values.den2) {
                setOperationInputs({
                  num1: values.num1 as string,
                  den1: values.den1 as string,
                  num2: values.num2 as string,
                  den2: values.den2 as string
                })
                setActiveTab('operations')
              }
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calcolatrice di Frazioni
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="simplify">Semplifica</TabsTrigger>
                    <TabsTrigger value="operations">Operazioni</TabsTrigger>
                    <TabsTrigger value="conversion">Conversione</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="simplify" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Numeratore</label>
                        <Input
                          type="number"
                          placeholder="Es: 12"
                          value={simplifyInput.numerator}
                          onChange={(e) => setSimplifyInput(prev => ({ ...prev, numerator: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Denominatore</label>
                        <Input
                          type="number"
                          placeholder="Es: 18"
                          value={simplifyInput.denominator}
                          onChange={(e) => setSimplifyInput(prev => ({ ...prev, denominator: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleSimplify} className="w-full calculator-button">
                      <Calculator className="h-4 w-4 mr-2" />
                      Semplifica Frazione
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="operations" className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Num 1</label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={operationInputs.num1}
                          onChange={(e) => setOperationInputs(prev => ({ ...prev, num1: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Den 1</label>
                        <Input
                          type="number"
                          placeholder="4"
                          value={operationInputs.den1}
                          onChange={(e) => setOperationInputs(prev => ({ ...prev, den1: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Num 2</label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={operationInputs.num2}
                          onChange={(e) => setOperationInputs(prev => ({ ...prev, num2: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Den 2</label>
                        <Input
                          type="number"
                          placeholder="3"
                          value={operationInputs.den2}
                          onChange={(e) => setOperationInputs(prev => ({ ...prev, den2: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => handleOperation('add')} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Somma
                      </Button>
                      <Button onClick={() => handleOperation('subtract')} variant="outline">
                        <Minus className="h-4 w-4 mr-2" />
                        Sottrai
                      </Button>
                      <Button onClick={() => handleOperation('multiply')} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Moltiplica
                      </Button>
                      <Button onClick={() => handleOperation('divide')} variant="outline">
                        <Divide className="h-4 w-4 mr-2" />
                        Dividi
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conversion" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Numero Decimale</label>
                      <Input
                        type="number"
                        step="any"
                        placeholder="Es: 0.75"
                        value={decimalInput}
                        onChange={(e) => setDecimalInput(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => handleDecimalConversion('fromDecimal')} variant="outline">
                        Decimale → Frazione
                      </Button>
                      <Button onClick={() => handleDecimalConversion('toDecimal')} variant="outline">
                        Frazione → Decimale
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                {results && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {results.numerator !== undefined && results.denominator !== undefined && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {results.numerator}/{results.denominator}
                          </div>
                          {results.decimal !== undefined && (
                            <div className="text-lg text-gray-600">
                              = {results.decimal}
                            </div>
                          )}
                        </div>
                      )}
                      {results.decimal !== undefined && results.numerator === undefined && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {results.decimal}
                          </div>
                        </div>
                      )}
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
