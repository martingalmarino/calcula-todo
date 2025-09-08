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
  determinant,
  inverseMatrix,
  scalarMultiply,
  transpose,
  type Matrix,
  type MatrixResult
} from '@/lib/math/matrices'

export default function MatricesPage() {
  const [activeTab, setActiveTab] = useState('add')
  const [results, setResults] = useState<MatrixResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [matrix1Values, setMatrix1Values] = useState({ 
    rows: '2', cols: '2', 
    data: '1,2,3,4' 
  })
  const [matrix2Values, setMatrix2Values] = useState({ 
    rows: '2', cols: '2', 
    data: '5,6,7,8' 
  })
  const [scalarValue, setScalarValue] = useState('2')
  const [singleMatrixValues, setSingleMatrixValues] = useState({ 
    rows: '2', cols: '2', 
    data: '1,2,3,4' 
  })

  const parseMatrixData = (data: string, rows: number, cols: number): number[][] => {
    const values = data.split(',').map(v => parseFloat(v.trim()))
    if (values.length !== rows * cols) {
      throw new Error(`Se esperan ${rows * cols} valores, se encontraron ${values.length}`)
    }
    
    const matrix: number[][] = []
    for (let i = 0; i < rows; i++) {
      const row: number[] = []
      for (let j = 0; j < cols; j++) {
        row.push(values[i * cols + j])
      }
      matrix.push(row)
    }
    return matrix
  }

  const formatMatrix = (matrix: Matrix): string => {
    if (typeof matrix === 'number') {
      return matrix.toString()
    }
    if (matrix.data) {
      return matrix.data.map((row: number[]) => 
        `[${row.join(', ')}]`
      ).join('\n')
    }
    return matrix.toString()
  }

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      const rows1 = Number(matrix1Values.rows)
      const cols1 = Number(matrix1Values.cols)
      const matrix1 = createMatrix(parseMatrixData(matrix1Values.data, rows1, cols1))

      switch (activeTab) {
        case 'add':
          const rows2 = Number(matrix2Values.rows)
          const cols2 = Number(matrix2Values.cols)
          const matrix2 = createMatrix(parseMatrixData(matrix2Values.data, rows2, cols2))
          result = addMatrices(matrix1, matrix2)
          break
        case 'subtract':
          const rows2Sub = Number(matrix2Values.rows)
          const cols2Sub = Number(matrix2Values.cols)
          const matrix2Sub = createMatrix(parseMatrixData(matrix2Values.data, rows2Sub, cols2Sub))
          result = subtractMatrices(matrix1, matrix2Sub)
          break
        case 'multiply':
          const rows2Mult = Number(matrix2Values.rows)
          const cols2Mult = Number(matrix2Values.cols)
          const matrix2Mult = createMatrix(parseMatrixData(matrix2Values.data, rows2Mult, cols2Mult))
          result = multiplyMatrices(matrix1, matrix2Mult)
          break
        case 'scalar':
          result = scalarMultiply(matrix1, Number(scalarValue))
          break
        case 'determinant':
          result = determinant(matrix1)
          break
        case 'inverse':
          result = inverseMatrix(matrix1)
          break
        case 'transpose':
          result = transpose(matrix1)
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

  const handleExampleClick = (values: Record<string, unknown>) => {
    switch (activeTab) {
      case 'add':
      case 'subtract':
      case 'multiply':
        setMatrix1Values({ 
          rows: (values.rows1 as number).toString(), 
          cols: (values.cols1 as number).toString(),
          data: (values.matrix1 as string)
        })
        setMatrix2Values({ 
          rows: (values.rows2 as number).toString(), 
          cols: (values.cols2 as number).toString(),
          data: (values.matrix2 as string)
        })
        break
      case 'scalar':
        setMatrix1Values({ 
          rows: (values.rows as number).toString(), 
          cols: (values.cols as number).toString(),
          data: (values.matrix as string)
        })
        setScalarValue((values.scalar as number).toString())
        break
      case 'determinant':
      case 'inverse':
      case 'transpose':
        setSingleMatrixValues({ 
          rows: (values.rows as number).toString(), 
          cols: (values.cols as number).toString(),
          data: (values.matrix as string)
        })
        break
    }
  }

  const examples = [
    { label: 'Suma 2x2', values: { rows1: 2, cols1: 2, matrix1: '1,2,3,4', rows2: 2, cols2: 2, matrix2: '5,6,7,8' } },
    { label: 'Multiplicación 2x2', values: { rows1: 2, cols1: 2, matrix1: '1,2,3,4', rows2: 2, cols2: 2, matrix2: '2,0,1,3' } },
    { label: 'Escalar ×2', values: { rows: 2, cols: 2, matrix: '1,2,3,4', scalar: 2 } },
    { label: 'Determinante 2x2', values: { rows: 2, cols: 2, matrix: '3,1,2,4' } },
    { label: 'Inversa 2x2', values: { rows: 2, cols: 2, matrix: '4,3,3,2' } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una matriz?",
      answer: "Una matriz es un arreglo rectangular de números organizados en filas y columnas. Se usa para representar sistemas de ecuaciones lineales, transformaciones geométricas y más."
    },
    {
      question: "¿Cómo se suman matrices?",
      answer: "Para sumar dos matrices, deben tener las mismas dimensiones. Se suman elemento por elemento: (A + B)[i][j] = A[i][j] + B[i][j]."
    },
    {
      question: "¿Cómo se multiplican matrices?",
      answer: "Para multiplicar matrices A y B, el número de columnas de A debe ser igual al número de filas de B. El elemento (AB)[i][j] es la suma de los productos de los elementos de la fila i de A por la columna j de B."
    },
    {
      question: "¿Qué es el determinante?",
      answer: "El determinante es un número escalar que se calcula a partir de los elementos de una matriz cuadrada. Es útil para determinar si una matriz tiene inversa y para resolver sistemas de ecuaciones."
    },
    {
      question: "¿Qué es la matriz inversa?",
      answer: "La matriz inversa A⁻¹ de una matriz A es tal que A × A⁻¹ = I (matriz identidad). Solo las matrices cuadradas con determinante no nulo tienen inversa."
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
            description: 'Realiza operaciones con matrices: suma, resta, multiplicación, determinante, inversa y más',
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
            description="Realiza operaciones con matrices: suma, resta, multiplicación, determinante, inversa y más"
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
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="m1-rows" className="calculator-label">
                        Filas Matriz 1
                      </label>
                      <Input
                        id="m1-rows"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.rows}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="m1-cols" className="calculator-label">
                        Columnas Matriz 1
                      </label>
                      <Input
                        id="m1-cols"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.cols}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="m1-data" className="calculator-label">
                      Datos Matriz 1 (separados por comas)
                    </label>
                    <Input
                      id="m1-data"
                      type="text"
                      placeholder="Ej: 1,2,3,4"
                      value={matrix1Values.data}
                      onChange={(e) => setMatrix1Values({ ...matrix1Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>

                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="m2-rows" className="calculator-label">
                        Filas Matriz 2
                      </label>
                      <Input
                        id="m2-rows"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix2Values.rows}
                        onChange={(e) => setMatrix2Values({ ...matrix2Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="m2-cols" className="calculator-label">
                        Columnas Matriz 2
                      </label>
                      <Input
                        id="m2-cols"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix2Values.cols}
                        onChange={(e) => setMatrix2Values({ ...matrix2Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="m2-data" className="calculator-label">
                      Datos Matriz 2 (separados por comas)
                    </label>
                    <Input
                      id="m2-data"
                      type="text"
                      placeholder="Ej: 5,6,7,8"
                      value={matrix2Values.data}
                      onChange={(e) => setMatrix2Values({ ...matrix2Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Sumar Matrices
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="subtract" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="m1-rows-sub" className="calculator-label">
                        Filas Matriz 1
                      </label>
                      <Input
                        id="m1-rows-sub"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.rows}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="m1-cols-sub" className="calculator-label">
                        Columnas Matriz 1
                      </label>
                      <Input
                        id="m1-cols-sub"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.cols}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="m1-data-sub" className="calculator-label">
                      Datos Matriz 1 (separados por comas)
                    </label>
                    <Input
                      id="m1-data-sub"
                      type="text"
                      placeholder="Ej: 1,2,3,4"
                      value={matrix1Values.data}
                      onChange={(e) => setMatrix1Values({ ...matrix1Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>

                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="m2-rows-sub" className="calculator-label">
                        Filas Matriz 2
                      </label>
                      <Input
                        id="m2-rows-sub"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix2Values.rows}
                        onChange={(e) => setMatrix2Values({ ...matrix2Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="m2-cols-sub" className="calculator-label">
                        Columnas Matriz 2
                      </label>
                      <Input
                        id="m2-cols-sub"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix2Values.cols}
                        onChange={(e) => setMatrix2Values({ ...matrix2Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="m2-data-sub" className="calculator-label">
                      Datos Matriz 2 (separados por comas)
                    </label>
                    <Input
                      id="m2-data-sub"
                      type="text"
                      placeholder="Ej: 5,6,7,8"
                      value={matrix2Values.data}
                      onChange={(e) => setMatrix2Values({ ...matrix2Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Minus className="h-4 w-4 mr-2" />
                    Restar Matrices
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="multiply" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="m1-rows-mult" className="calculator-label">
                        Filas Matriz 1
                      </label>
                      <Input
                        id="m1-rows-mult"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.rows}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="m1-cols-mult" className="calculator-label">
                        Columnas Matriz 1
                      </label>
                      <Input
                        id="m1-cols-mult"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.cols}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="m1-data-mult" className="calculator-label">
                      Datos Matriz 1 (separados por comas)
                    </label>
                    <Input
                      id="m1-data-mult"
                      type="text"
                      placeholder="Ej: 1,2,3,4"
                      value={matrix1Values.data}
                      onChange={(e) => setMatrix1Values({ ...matrix1Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>

                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="m2-rows-mult" className="calculator-label">
                        Filas Matriz 2
                      </label>
                      <Input
                        id="m2-rows-mult"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix2Values.rows}
                        onChange={(e) => setMatrix2Values({ ...matrix2Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="m2-cols-mult" className="calculator-label">
                        Columnas Matriz 2
                      </label>
                      <Input
                        id="m2-cols-mult"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix2Values.cols}
                        onChange={(e) => setMatrix2Values({ ...matrix2Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="m2-data-mult" className="calculator-label">
                      Datos Matriz 2 (separados por comas)
                    </label>
                    <Input
                      id="m2-data-mult"
                      type="text"
                      placeholder="Ej: 2,0,1,3"
                      value={matrix2Values.data}
                      onChange={(e) => setMatrix2Values({ ...matrix2Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <X className="h-4 w-4 mr-2" />
                    Multiplicar Matrices
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="scalar" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="scalar-rows" className="calculator-label">
                        Filas
                      </label>
                      <Input
                        id="scalar-rows"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.rows}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="scalar-cols" className="calculator-label">
                        Columnas
                      </label>
                      <Input
                        id="scalar-cols"
                        type="number"
                        min="1"
                        max="5"
                        value={matrix1Values.cols}
                        onChange={(e) => setMatrix1Values({ ...matrix1Values, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="scalar-data" className="calculator-label">
                      Datos Matriz (separados por comas)
                    </label>
                    <Input
                      id="scalar-data"
                      type="text"
                      placeholder="Ej: 1,2,3,4"
                      value={matrix1Values.data}
                      onChange={(e) => setMatrix1Values({ ...matrix1Values, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="scalar-value" className="calculator-label">
                      Escalar
                    </label>
                    <Input
                      id="scalar-value"
                      type="number"
                      step="0.001"
                      placeholder="Ej: 2"
                      value={scalarValue}
                      onChange={(e) => setScalarValue(e.target.value)}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <X className="h-4 w-4 mr-2" />
                    Multiplicar por Escalar
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="determinant" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="det-rows" className="calculator-label">
                        Filas (matriz cuadrada)
                      </label>
                      <Input
                        id="det-rows"
                        type="number"
                        min="1"
                        max="4"
                        value={singleMatrixValues.rows}
                        onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, rows: e.target.value, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="det-cols" className="calculator-label">
                        Columnas (matriz cuadrada)
                      </label>
                      <Input
                        id="det-cols"
                        type="number"
                        min="1"
                        max="4"
                        value={singleMatrixValues.cols}
                        onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, cols: e.target.value, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="det-data" className="calculator-label">
                      Datos Matriz (separados por comas)
                    </label>
                    <Input
                      id="det-data"
                      type="text"
                      placeholder="Ej: 3,1,2,4"
                      value={singleMatrixValues.data}
                      onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Square className="h-4 w-4 mr-2" />
                    Calcular Determinante
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="inverse" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="inv-rows" className="calculator-label">
                        Filas (matriz cuadrada)
                      </label>
                      <Input
                        id="inv-rows"
                        type="number"
                        min="1"
                        max="4"
                        value={singleMatrixValues.rows}
                        onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, rows: e.target.value, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-cols" className="calculator-label">
                        Columnas (matriz cuadrada)
                      </label>
                      <Input
                        id="inv-cols"
                        type="number"
                        min="1"
                        max="4"
                        value={singleMatrixValues.cols}
                        onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, cols: e.target.value, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="inv-data" className="calculator-label">
                      Datos Matriz (separados por comas)
                    </label>
                    <Input
                      id="inv-data"
                      type="text"
                      placeholder="Ej: 4,3,3,2"
                      value={singleMatrixValues.data}
                      onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Matriz Inversa
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="transpose" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="trans-rows" className="calculator-label">
                        Filas
                      </label>
                      <Input
                        id="trans-rows"
                        type="number"
                        min="1"
                        max="5"
                        value={singleMatrixValues.rows}
                        onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, rows: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="trans-cols" className="calculator-label">
                        Columnas
                      </label>
                      <Input
                        id="trans-cols"
                        type="number"
                        min="1"
                        max="5"
                        value={singleMatrixValues.cols}
                        onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, cols: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="trans-data" className="calculator-label">
                      Datos Matriz (separados por comas)
                    </label>
                    <Input
                      id="trans-data"
                      type="text"
                      placeholder="Ej: 1,2,3,4,5,6"
                      value={singleMatrixValues.data}
                      onChange={(e) => setSingleMatrixValues({ ...singleMatrixValues, data: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
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
                  <div className="text-lg font-semibold">
                    Método: {results.method}
                  </div>
                  
                  {typeof results.result === 'number' ? (
                    <div className="text-2xl font-bold text-primary">
                      Resultado: {results.result.toFixed(6)}
                    </div>
                  ) : (
                    <div className="text-lg font-semibold">
                      Matriz Resultado:
                    </div>
                  )}
                  
                  {results.result && typeof results.result === 'object' && results.result.data && (
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      <pre>{formatMatrix(results.result)}</pre>
                    </div>
                  )}
                  
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
