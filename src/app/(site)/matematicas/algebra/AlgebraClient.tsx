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
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
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

export default function AlgebraClient() {
  const [activeTab, setActiveTab] = useState('linear')
  const [results, setResults] = useState<LinearResult | QuadraticResult | System2x2Result | { factors: string; steps: string[] } | { x: number; y: number; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [linearInputs, setLinearInputs] = useState({ a: '', b: '', c: '' })
  const [quadraticInputs, setQuadraticInputs] = useState({ a: '', b: '', c: '' })
  const [systemInputs, setSystemInputs] = useState({ 
    a1: '', b1: '', c1: '', 
    a2: '', b2: '', c2: '' 
  })
  const [factorInputs, setFactorInputs] = useState({ a: '', b: '', c: '' })
  const [vertexInputs, setVertexInputs] = useState({ a: '', b: '', c: '' })

  const handleLinearCalculate = () => {
    try {
      const a = parseFloat(linearInputs.a)
      const b = parseFloat(linearInputs.b)
      const c = parseFloat(linearInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Por favor ingresa números válidos')
        return
      }

      const result = solveLinear(a, b)
      setResults(result)
      setError(null)
    } catch {
      setError('Error al calcular la ecuación lineal')
    }
  }

  const handleQuadraticCalculate = () => {
    try {
      const a = parseFloat(quadraticInputs.a)
      const b = parseFloat(quadraticInputs.b)
      const c = parseFloat(quadraticInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Por favor ingresa números válidos')
        return
      }

      if (a === 0) {
        setError('El coeficiente a no puede ser 0 en una ecuación cuadrática')
        return
      }

      const result = solveQuadratic(a, b, c)
      setResults(result)
      setError(null)
    } catch {
      setError('Error al calcular la ecuación cuadrática')
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
        setError('Por favor ingresa números válidos')
        return
      }

      const result = solveSystem2x2(a1, b1, c1, a2, b2, c2)
      setResults(result)
      setError(null)
    } catch {
      setError('Error al calcular el sistema de ecuaciones')
    }
  }

  const handleFactorCalculate = () => {
    try {
      const a = parseFloat(factorInputs.a)
      const b = parseFloat(factorInputs.b)
      const c = parseFloat(factorInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Por favor ingresa números válidos')
        return
      }

      const result = factorQuadratic(a, b, c)
      setResults(result)
      setError(null)
    } catch {
      setError('Error al factorizar la expresión')
    }
  }

  const handleVertexCalculate = () => {
    try {
      const a = parseFloat(vertexInputs.a)
      const b = parseFloat(vertexInputs.b)
      const c = parseFloat(vertexInputs.c)

      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setError('Por favor ingresa números válidos')
        return
      }

      if (a === 0) {
        setError('El coeficiente a no puede ser 0')
        return
      }

      const result = vertexOfParabola(a, b, c)
      setResults(result)
      setError(null)
    } catch {
      setError('Error al calcular el vértice')
    }
  }

  const breadcrumbs = getBreadcrumbs('/matematicas/algebra')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Álgebra',
            description: 'Resuelve ecuaciones lineales, cuadráticas, sistemas 2x2, factorización y vértice de parábolas',
            url: '/matematicas/algebra',
            category: 'Matemáticas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Álgebra"
            description="Herramienta completa para resolver problemas de álgebra"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="linear" className="calculator-tab">Lineal</TabsTrigger>
                <TabsTrigger value="quadratic" className="calculator-tab">Cuadrática</TabsTrigger>
                <TabsTrigger value="system" className="calculator-tab">Sistema 2x2</TabsTrigger>
                <TabsTrigger value="factor" className="calculator-tab">Factorizar</TabsTrigger>
                <TabsTrigger value="vertex" className="calculator-tab">Vértice</TabsTrigger>
              </TabsList>

              <TabsContent value="linear" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Ecuación Lineal: ax + b = c
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="linear-a" className="calculator-label">Coeficiente a</label>
                        <Input
                          id="linear-a"
                          type="number"
                          value={linearInputs.a}
                          onChange={(e) => setLinearInputs({...linearInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 2"
                        />
                      </div>
                      <div>
                        <label htmlFor="linear-b" className="calculator-label">Coeficiente b</label>
                        <Input
                          id="linear-b"
                          type="number"
                          value={linearInputs.b}
                          onChange={(e) => setLinearInputs({...linearInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 3"
                        />
                      </div>
                      <div>
                        <label htmlFor="linear-c" className="calculator-label">Término independiente c</label>
                        <Input
                          id="linear-c"
                          type="number"
                          value={linearInputs.c}
                          onChange={(e) => setLinearInputs({...linearInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 7"
                        />
                      </div>
                    </div>
                    <Button onClick={handleLinearCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Resolver Ecuación
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quadratic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      Ecuación Cuadrática: ax² + bx + c = 0
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="quad-a" className="calculator-label">Coeficiente a</label>
                        <Input
                          id="quad-a"
                          type="number"
                          value={quadraticInputs.a}
                          onChange={(e) => setQuadraticInputs({...quadraticInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="quad-b" className="calculator-label">Coeficiente b</label>
                        <Input
                          id="quad-b"
                          type="number"
                          value={quadraticInputs.b}
                          onChange={(e) => setQuadraticInputs({...quadraticInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: -5"
                        />
                      </div>
                      <div>
                        <label htmlFor="quad-c" className="calculator-label">Coeficiente c</label>
                        <Input
                          id="quad-c"
                          type="number"
                          value={quadraticInputs.c}
                          onChange={(e) => setQuadraticInputs({...quadraticInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 6"
                        />
                      </div>
                    </div>
                    <Button onClick={handleQuadraticCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Resolver Ecuación
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Sistema de Ecuaciones 2x2
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
                          placeholder="Ej: 2"
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
                          placeholder="Ej: 3"
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
                          placeholder="Ej: 7"
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
                          placeholder="Ej: 1"
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
                          placeholder="Ej: -1"
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
                          placeholder="Ej: 1"
                        />
                      </div>
                    </div>
                    <Button onClick={handleSystemCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Resolver Sistema
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="factor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      Factorización: ax² + bx + c
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="factor-a" className="calculator-label">Coeficiente a</label>
                        <Input
                          id="factor-a"
                          type="number"
                          value={factorInputs.a}
                          onChange={(e) => setFactorInputs({...factorInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="factor-b" className="calculator-label">Coeficiente b</label>
                        <Input
                          id="factor-b"
                          type="number"
                          value={factorInputs.b}
                          onChange={(e) => setFactorInputs({...factorInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 5"
                        />
                      </div>
                      <div>
                        <label htmlFor="factor-c" className="calculator-label">Coeficiente c</label>
                        <Input
                          id="factor-c"
                          type="number"
                          value={factorInputs.c}
                          onChange={(e) => setFactorInputs({...factorInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 6"
                        />
                      </div>
                    </div>
                    <Button onClick={handleFactorCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Factorizar
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vertex" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      Vértice de Parábola: ax² + bx + c
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="calculator-grid">
                      <div>
                        <label htmlFor="vertex-a" className="calculator-label">Coeficiente a</label>
                        <Input
                          id="vertex-a"
                          type="number"
                          value={vertexInputs.a}
                          onChange={(e) => setVertexInputs({...vertexInputs, a: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 1"
                        />
                      </div>
                      <div>
                        <label htmlFor="vertex-b" className="calculator-label">Coeficiente b</label>
                        <Input
                          id="vertex-b"
                          type="number"
                          value={vertexInputs.b}
                          onChange={(e) => setVertexInputs({...vertexInputs, b: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: -4"
                        />
                      </div>
                      <div>
                        <label htmlFor="vertex-c" className="calculator-label">Coeficiente c</label>
                        <Input
                          id="vertex-c"
                          type="number"
                          value={vertexInputs.c}
                          onChange={(e) => setVertexInputs({...vertexInputs, c: e.target.value})}
                          className="calculator-input"
                          placeholder="Ej: 3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleVertexCalculate} className="calculator-button">
                      <Calculator className="h-4 w-4" />
                      Calcular Vértice
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
                  <CardTitle>Resultado</CardTitle>
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
                        Vértice: ({(results as { x: number; y: number; steps: string[] }).x.toFixed(6)}, {(results as { x: number; y: number; steps: string[] }).y.toFixed(6)})
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
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
