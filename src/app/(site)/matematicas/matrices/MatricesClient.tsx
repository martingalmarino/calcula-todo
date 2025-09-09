"use client"

import { useState } from 'react'
import { Calculator, Plus, Minus, X, Square } from 'lucide-react'
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
  createMatrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  scalarMultiply,
  determinant,
  inverseMatrix,
  transpose,
  matrixToString,
  type Matrix,
  type MatrixResult
} from '@/lib/math/matrices'

export default function MatricesClient() {
  const [activeTab, setActiveTab] = useState('add')
  const [results, setResults] = useState<MatrixResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [matrix1, setMatrix1] = useState([
    ['1', '2'],
    ['3', '4']
  ])
  const [matrix2, setMatrix2] = useState([
    ['5', '6'],
    ['7', '8']
  ])
  const [scalar, setScalar] = useState('2')

  const updateMatrix = (matrix: string[][], setMatrix: (matrix: string[][]) => void, row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, rIndex) => 
      r.map((c, cIndex) => rIndex === row && cIndex === col ? value : c)
    )
    setMatrix(newMatrix)
  }

  const formatMatrix = (matrix: Matrix | number): string => {
    if (typeof matrix === 'number') {
      return matrix.toString()
    }
    return matrixToString(matrix)
  }

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      const m1 = createMatrix(matrix1.map(row => row.map(cell => parseFloat(cell) || 0)))
      const m2 = createMatrix(matrix2.map(row => row.map(cell => parseFloat(cell) || 0)))
      const scalarValue = parseFloat(scalar) || 0

      switch (activeTab) {
        case 'add':
          result = addMatrices(m1, m2)
          break
        case 'subtract':
          result = subtractMatrices(m1, m2)
          break
        case 'multiply':
          result = multiplyMatrices(m1, m2)
          break
        case 'scalar':
          result = scalarMultiply(m1, scalarValue)
          break
        case 'determinant':
          result = determinant(m1)
          break
        case 'inverse':
          result = inverseMatrix(m1)
          break
        case 'transpose':
          result = transpose(m1)
          break
        default:
          setError('Tipo de cálculo no válido')
          return
      }
      setResults(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo')
    }
  }

  const handleExampleClick = (_values: Record<string, unknown>) => {
    // Implementar ejemplos si es necesario
  }

  const examples = [
    { label: 'Suma de matrices 2x2', values: {} },
    { label: 'Multiplicación de matrices', values: {} },
    { label: 'Determinante de matriz 2x2', values: {} }
  ]

  const faqItems = [
    {
      question: "¿Qué es una matriz?",
      answer: "Una matriz es un arreglo rectangular de números organizados en filas y columnas. Se utilizan en álgebra lineal para resolver sistemas de ecuaciones y realizar transformaciones."
    },
    {
      question: "¿Cómo se suman matrices?",
      answer: "Para sumar matrices, se suman los elementos correspondientes. Las matrices deben tener las mismas dimensiones."
    },
    {
      question: "¿Qué es el determinante?",
      answer: "El determinante es un valor escalar que se puede calcular para matrices cuadradas. Se utiliza para determinar si una matriz es invertible."
    },
    {
      question: "¿Qué es la matriz inversa?",
      answer: "La matriz inversa de una matriz A es una matriz A⁻¹ tal que A × A⁻¹ = I, donde I es la matriz identidad."
    },
    {
      question: "¿Qué es la transpuesta de una matriz?",
      answer: "La transpuesta de una matriz se obtiene intercambiando filas por columnas. Si A es una matriz m×n, su transpuesta Aᵀ es n×m."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'matrices').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Matrices',
            description: 'Operaciones con matrices: suma, resta, multiplicación, determinante, inversa y transpuesta',
            url: '/matematicas/matrices/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/matrices/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Matrices"
            description="Operaciones con matrices: suma, resta, multiplicación, determinante, inversa y transpuesta"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="add" className="calculator-tab">Suma</TabsTrigger>
                <TabsTrigger value="subtract" className="calculator-tab">Resta</TabsTrigger>
                <TabsTrigger value="multiply" className="calculator-tab">Multiplicar</TabsTrigger>
                <TabsTrigger value="scalar" className="calculator-tab">Escalar</TabsTrigger>
                <TabsTrigger value="determinant" className="calculator-tab">Determinante</TabsTrigger>
                <TabsTrigger value="inverse" className="calculator-tab">Inversa</TabsTrigger>
                <TabsTrigger value="transpose" className="calculator-tab">Transpuesta</TabsTrigger>
              </TabsList>

              <TabsContent value="add" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Matriz A</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {matrix1.map((row, rIndex) => 
                          row.map((cell, cIndex) => (
                            <Input
                              key={`${rIndex}-${cIndex}`}
                              type="number"
                              step="0.001"
                              value={cell}
                              onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                              className="calculator-input"
                            />
                          ))
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Matriz B</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {matrix2.map((row, rIndex) => 
                          row.map((cell, cIndex) => (
                            <Input
                              key={`${rIndex}-${cIndex}`}
                              type="number"
                              step="0.001"
                              value={cell}
                              onChange={(e) => updateMatrix(matrix2, setMatrix2, rIndex, cIndex, e.target.value)}
                              className="calculator-input"
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Sumar Matrices
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="subtract" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Matriz A</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {matrix1.map((row, rIndex) => 
                          row.map((cell, cIndex) => (
                            <Input
                              key={`${rIndex}-${cIndex}`}
                              type="number"
                              step="0.001"
                              value={cell}
                              onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                              className="calculator-input"
                            />
                          ))
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Matriz B</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {matrix2.map((row, rIndex) => 
                          row.map((cell, cIndex) => (
                            <Input
                              key={`${rIndex}-${cIndex}`}
                              type="number"
                              step="0.001"
                              value={cell}
                              onChange={(e) => updateMatrix(matrix2, setMatrix2, rIndex, cIndex, e.target.value)}
                              className="calculator-input"
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Minus className="h-4 w-4 mr-2" />
                    Restar Matrices
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="multiply" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Matriz A</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {matrix1.map((row, rIndex) => 
                          row.map((cell, cIndex) => (
                            <Input
                              key={`${rIndex}-${cIndex}`}
                              type="number"
                              step="0.001"
                              value={cell}
                              onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                              className="calculator-input"
                            />
                          ))
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Matriz B</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {matrix2.map((row, rIndex) => 
                          row.map((cell, cIndex) => (
                            <Input
                              key={`${rIndex}-${cIndex}`}
                              type="number"
                              step="0.001"
                              value={cell}
                              onChange={(e) => updateMatrix(matrix2, setMatrix2, rIndex, cIndex, e.target.value)}
                              className="calculator-input"
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <X className="h-4 w-4 mr-2" />
                    Multiplicar Matrices
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="scalar" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Matriz</h3>
                    <div className="grid grid-cols-2 gap-2 w-32">
                      {matrix1.map((row, rIndex) => 
                        row.map((cell, cIndex) => (
                          <Input
                            key={`${rIndex}-${cIndex}`}
                            type="number"
                            step="0.001"
                            value={cell}
                            onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                            className="calculator-input"
                          />
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="scalar" className="calculator-label">Escalar</label>
                    <Input
                      id="scalar"
                      type="number"
                      step="0.001"
                      placeholder="Ej: 2"
                      value={scalar}
                      onChange={(e) => setScalar(e.target.value)}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4 mr-2" />
                    Multiplicar por Escalar
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="determinant" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Matriz</h3>
                    <div className="grid grid-cols-2 gap-2 w-32">
                      {matrix1.map((row, rIndex) => 
                        row.map((cell, cIndex) => (
                          <Input
                            key={`${rIndex}-${cIndex}`}
                            type="number"
                            step="0.001"
                            value={cell}
                            onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                            className="calculator-input"
                          />
                        ))
                      )}
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Square className="h-4 w-4 mr-2" />
                    Calcular Determinante
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="inverse" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Matriz</h3>
                    <div className="grid grid-cols-2 gap-2 w-32">
                      {matrix1.map((row, rIndex) => 
                        row.map((cell, cIndex) => (
                          <Input
                            key={`${rIndex}-${cIndex}`}
                            type="number"
                            step="0.001"
                            value={cell}
                            onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                            className="calculator-input"
                          />
                        ))
                      )}
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Inversa
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="transpose" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Matriz</h3>
                    <div className="grid grid-cols-2 gap-2 w-32">
                      {matrix1.map((row, rIndex) => 
                        row.map((cell, cIndex) => (
                          <Input
                            key={`${rIndex}-${cIndex}`}
                            type="number"
                            step="0.001"
                            value={cell}
                            onChange={(e) => updateMatrix(matrix1, setMatrix1, rIndex, cIndex, e.target.value)}
                            className="calculator-input"
                          />
                        ))
                      )}
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Transpuesta
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Resultados */}
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
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {formatMatrix(results.result)}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
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
    </>
  )
}
