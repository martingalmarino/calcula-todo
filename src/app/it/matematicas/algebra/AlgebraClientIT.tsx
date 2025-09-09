"use client"

import { useState } from 'react'
import { Calculator, X, Square } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { 
  solveLinear,
  solveQuadratic,
  solveSystem2x2,
  factorQuadratic,
  vertexOfParabola,
  type LinearResult,
  type QuadraticResult,
  type System2x2Result
} from '@/lib/math/algebra'

export default function AlgebraClientIT() {
  const [activeTab, setActiveTab] = useState('linear')
  const [results, setResults] = useState<LinearResult | QuadraticResult | System2x2Result | { factors: string; steps: string[] } | { x: number; y: number; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Stati per ogni tipo di calcolo
  const [linearInputs, setLinearInputs] = useState({ a: '', b: '', c: '' })
  const [quadraticInputs, setQuadraticInputs] = useState({ a: '', b: '', c: '' })
  const [systemInputs, setSystemInputs] = useState({ 
    a1: '', b1: '', c1: '', 
    a2: '', b2: '', c2: '' 
  })
  const [factorInputs, setFactorInputs] = useState({ a: '', b: '', c: '' })
  const [vertexInputs, setVertexInputs] = useState({ a: '', b: '', c: '' })

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' },
    { label: 'Algebra', href: '/it/matematicas/algebra' }
  ]

  const handleLinearCalculate = () => {
    try {
      const a = parseFloat(linearInputs.a)
      const b = parseFloat(linearInputs.b)
      const c = parseFloat(linearInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Per favore inserisci numeri validi')
        return
      }

      const result = solveLinear(a, b)
      setResults(result)
      setError(null)
    } catch {
      setError('Errore nel calcolo dell\'equazione lineare')
    }
  }

  const handleQuadraticCalculate = () => {
    try {
      const a = parseFloat(quadraticInputs.a)
      const b = parseFloat(quadraticInputs.b)
      const c = parseFloat(quadraticInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Per favore inserisci numeri validi')
        return
      }

      if (a === 0) {
        setError('Il coefficiente a non può essere 0 in un\'equazione quadratica')
        return
      }

      const result = solveQuadratic(a, b, c)
      setResults(result)
      setError(null)
    } catch {
      setError('Errore nel calcolo dell\'equazione quadratica')
    }
  }

  const handleSystemCalculate = () => {
    try {
      const a1 = parseFloat(systemInputs.a1)
      const b1 = parseFloat(systemInputs.b1)
      const c1 = parseFloat(systemInputs.c1)
      const a2 = parseFloat(systemInputs.a2)
      const b2 = parseFloat(systemInputs.b2)
      const c2 = parseFloat(systemInputs.c2)

      if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2)) {
        setError('Per favore inserisci numeri validi')
        return
      }

      const result = solveSystem2x2(a1, b1, c1, a2, b2, c2)
      setResults(result)
      setError(null)
    } catch {
      setError('Errore nel calcolo del sistema di equazioni')
    }
  }

  const handleFactorCalculate = () => {
    try {
      const a = parseFloat(factorInputs.a)
      const b = parseFloat(factorInputs.b)
      const c = parseFloat(factorInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Per favore inserisci numeri validi')
        return
      }

      const result = factorQuadratic(a, b, c)
      setResults(result)
      setError(null)
    } catch {
      setError('Errore nella fattorizzazione dell\'espressione')
    }
  }

  const handleVertexCalculate = () => {
    try {
      const a = parseFloat(vertexInputs.a)
      const b = parseFloat(vertexInputs.b)
      const c = parseFloat(vertexInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Per favore inserisci numeri validi')
        return
      }

      if (a === 0) {
        setError('Il coefficiente a non può essere 0')
        return
      }

      const result = vertexOfParabola(a, b, c)
      setResults(result)
      setError(null)
    } catch {
      setError('Errore nel calcolo del vertice')
    }
  }

  const examples = [
    { label: 'Equazione lineare: 2x + 3 = 7', values: { a: 2, b: 3, c: 7 } },
    { label: 'Equazione quadratica: x² - 5x + 6 = 0', values: { a: 1, b: -5, c: 6 } },
    { label: 'Sistema 2x2: 2x + 3y = 7, x - y = 1', values: { a1: 2, b1: 3, c1: 7, a2: 1, b2: -1, c2: 1 } },
    { label: 'Fattorizzazione: x² + 5x + 6', values: { a: 1, b: 5, c: 6 } },
    { label: 'Vertice: x² - 4x + 3', values: { a: 1, b: -4, c: 3 } }
  ]

  const faqItems = [
    {
      question: "Cos'è un'equazione lineare?",
      answer: "Un'equazione lineare è un'equazione di primo grado nella forma ax + b = c, dove a, b e c sono costanti e a ≠ 0."
    },
    {
      question: "Cos'è un'equazione quadratica?",
      answer: "Un'equazione quadratica è un'equazione di secondo grado nella forma ax² + bx + c = 0, dove a, b e c sono costanti e a ≠ 0."
    },
    {
      question: "Come si risolve un sistema di equazioni 2x2?",
      answer: "Un sistema 2x2 si risolve usando metodi come sostituzione, eliminazione o matrici. La soluzione è il punto di intersezione delle due rette."
    },
    {
      question: "Cos'è la fattorizzazione?",
      answer: "La fattorizzazione è il processo di scrivere un'espressione come prodotto di fattori più semplici. Ad esempio: x² + 5x + 6 = (x + 2)(x + 3)."
    },
    {
      question: "Cos'è il vertice di una parabola?",
      answer: "Il vertice di una parabola è il punto dove la parabola raggiunge il suo valore massimo o minimo. Si calcola usando la formula x = -b/(2a)."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Algebra - Risoluzione Equazioni',
            description: 'Risolvi equazioni lineari, quadratiche, sistemi 2x2, fattorizzazione e vertice di parabole online',
            url: '/it/matematicas/algebra/',
            category: 'Matematica'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Algebra"
            description="Strumento completo per risolvere problemi di algebra"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.a !== undefined && values.a !== null && values.b !== undefined && values.b !== null && values.c !== undefined && values.c !== null) {
                if (activeTab === 'linear') {
                  setLinearInputs({ a: values.a.toString(), b: values.b.toString(), c: values.c.toString() })
                } else if (activeTab === 'quadratic') {
                  setQuadraticInputs({ a: values.a.toString(), b: values.b.toString(), c: values.c.toString() })
                } else if (activeTab === 'factor') {
                  setFactorInputs({ a: values.a.toString(), b: values.b.toString(), c: values.c.toString() })
                } else if (activeTab === 'vertex') {
                  setVertexInputs({ a: values.a.toString(), b: values.b.toString(), c: values.c.toString() })
                }
              } else if (values.a1 !== undefined && values.a1 !== null && values.b1 !== undefined && values.b1 !== null && values.c1 !== undefined && values.c1 !== null && values.a2 !== undefined && values.a2 !== null && values.b2 !== undefined && values.b2 !== null && values.c2 !== undefined && values.c2 !== null) {
                setSystemInputs({
                  a1: values.a1.toString(), b1: values.b1.toString(), c1: values.c1.toString(),
                  a2: values.a2.toString(), b2: values.b2.toString(), c2: values.c2.toString()
                })
              }
            }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="linear" className="calculator-tab">Lineare</TabsTrigger>
                <TabsTrigger value="quadratic" className="calculator-tab">Quadratica</TabsTrigger>
                <TabsTrigger value="system" className="calculator-tab">Sistema 2x2</TabsTrigger>
                <TabsTrigger value="factor" className="calculator-tab">Fattorizzare</TabsTrigger>
                <TabsTrigger value="vertex" className="calculator-tab">Vertice</TabsTrigger>
              </TabsList>

              <TabsContent value="linear" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Equazione Lineare: ax + b = c
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="linear-a" className="calculator-label">Coefficiente a</label>
                        <Input
                          id="linear-a"
                          type="number"
                          value={linearInputs.a}
                          onChange={(e) => setLinearInputs({...linearInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 2"
                        />
                      </div>
                      <div>
                        <label htmlFor="linear-b" className="calculator-label">Coefficiente b</label>
                        <Input
                          id="linear-b"
                          type="number"
                          value={linearInputs.b}
                          onChange={(e) => setLinearInputs({...linearInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 3"
                        />
                      </div>
                      <div>
                        <label htmlFor="linear-c" className="calculator-label">Termine indipendente c</label>
                        <Input
                          id="linear-c"
                          type="number"
                          value={linearInputs.c}
                          onChange={(e) => setLinearInputs({...linearInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 7"
                        />
                      </div>
                    </div>
                    <Button onClick={handleLinearCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Risolvere Equazione
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quadratic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      Equazione Quadratica: ax² + bx + c = 0
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="quad-a" className="calculator-label">Coefficiente a</label>
                        <Input
                          id="quad-a"
                          type="number"
                          value={quadraticInputs.a}
                          onChange={(e) => setQuadraticInputs({...quadraticInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="quad-b" className="calculator-label">Coefficiente b</label>
                        <Input
                          id="quad-b"
                          type="number"
                          value={quadraticInputs.b}
                          onChange={(e) => setQuadraticInputs({...quadraticInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: -5"
                        />
                      </div>
                      <div>
                        <label htmlFor="quad-c" className="calculator-label">Coefficiente c</label>
                        <Input
                          id="quad-c"
                          type="number"
                          value={quadraticInputs.c}
                          onChange={(e) => setQuadraticInputs({...quadraticInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 6"
                        />
                      </div>
                    </div>
                    <Button onClick={handleQuadraticCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Risolvere Equazione
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Sistema di Equazioni 2x2
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid-2">
                      <div>
                        <label htmlFor="sys-a1" className="calculator-label">a₁</label>
                        <Input
                          id="sys-a1"
                          type="number"
                          value={systemInputs.a1}
                          onChange={(e) => setSystemInputs({...systemInputs, a1: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 2"
                        />
                      </div>
                      <div>
                        <label htmlFor="sys-b1" className="calculator-label">b₁</label>
                        <Input
                          id="sys-b1"
                          type="number"
                          value={systemInputs.b1}
                          onChange={(e) => setSystemInputs({...systemInputs, b1: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 3"
                        />
                      </div>
                      <div>
                        <label htmlFor="sys-c1" className="calculator-label">c₁</label>
                        <Input
                          id="sys-c1"
                          type="number"
                          value={systemInputs.c1}
                          onChange={(e) => setSystemInputs({...systemInputs, c1: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 7"
                        />
                      </div>
                      <div>
                        <label htmlFor="sys-a2" className="calculator-label">a₂</label>
                        <Input
                          id="sys-a2"
                          type="number"
                          value={systemInputs.a2}
                          onChange={(e) => setSystemInputs({...systemInputs, a2: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="sys-b2" className="calculator-label">b₂</label>
                        <Input
                          id="sys-b2"
                          type="number"
                          value={systemInputs.b2}
                          onChange={(e) => setSystemInputs({...systemInputs, b2: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: -1"
                        />
                      </div>
                      <div>
                        <label htmlFor="sys-c2" className="calculator-label">c₂</label>
                        <Input
                          id="sys-c2"
                          type="number"
                          value={systemInputs.c2}
                          onChange={(e) => setSystemInputs({...systemInputs, c2: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 1"
                        />
                      </div>
                    </div>
                    <Button onClick={handleSystemCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Risolvere Sistema
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="factor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      Fattorizzazione: ax² + bx + c
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="factor-a" className="calculator-label">Coefficiente a</label>
                        <Input
                          id="factor-a"
                          type="number"
                          value={factorInputs.a}
                          onChange={(e) => setFactorInputs({...factorInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="factor-b" className="calculator-label">Coefficiente b</label>
                        <Input
                          id="factor-b"
                          type="number"
                          value={factorInputs.b}
                          onChange={(e) => setFactorInputs({...factorInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 5"
                        />
                      </div>
                      <div>
                        <label htmlFor="factor-c" className="calculator-label">Coefficiente c</label>
                        <Input
                          id="factor-c"
                          type="number"
                          value={factorInputs.c}
                          onChange={(e) => setFactorInputs({...factorInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 6"
                        />
                      </div>
                    </div>
                    <Button onClick={handleFactorCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Fattorizzare
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vertex" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      Vertice di Parabola: ax² + bx + c
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="vertex-a" className="calculator-label">Coefficiente a</label>
                        <Input
                          id="vertex-a"
                          type="number"
                          value={vertexInputs.a}
                          onChange={(e) => setVertexInputs({...vertexInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="vertex-b" className="calculator-label">Coefficiente b</label>
                        <Input
                          id="vertex-b"
                          type="number"
                          value={vertexInputs.b}
                          onChange={(e) => setVertexInputs({...vertexInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: -4"
                        />
                      </div>
                      <div>
                        <label htmlFor="vertex-c" className="calculator-label">Coefficiente c</label>
                        <Input
                          id="vertex-c"
                          type="number"
                          value={vertexInputs.c}
                          onChange={(e) => setVertexInputs({...vertexInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Es: 3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleVertexCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Calcolare Vertice
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <p className="text-red-600">{error}</p>
                </CardContent>
              </Card>
            )}

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Risultato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeTab === 'linear' && (
                    <div className="text-2xl font-bold text-primary">
                      x = {(results as LinearResult).x.toFixed(6)}
                    </div>
                  )}
                  
                  {activeTab === 'quadratic' && (
                    <div className="space-y-2">
                      {(results as QuadraticResult).x1 !== null && (
                        <div className="text-2xl font-bold text-primary">
                          x1 = {(results as QuadraticResult).x1!.toFixed(6)}
                        </div>
                      )}
                      {(results as QuadraticResult).x2 !== null && (
                        <div className="text-2xl font-bold text-primary">
                          x2 = {(results as QuadraticResult).x2!.toFixed(6)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'system' && (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        x = {(results as System2x2Result).x.toFixed(6)}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        y = {(results as System2x2Result).y.toFixed(6)}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'factor' && (
                    <div className="text-2xl font-bold text-primary">
                      {(results as { factors: string; steps: string[] }).factors}
                    </div>
                  )}
                  
                  {activeTab === 'vertex' && (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        Vertice: ({(results as { x: number; y: number; steps: string[] }).x.toFixed(6)}, {(results as { x: number; y: number; steps: string[] }).y.toFixed(6)})
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Passi:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {(results as { steps?: string[] }).steps?.map((step: string, index: number) => (
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
