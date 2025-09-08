"use client"

import { useState } from 'react'
import { Calculator, Hash, Users, Grid3X3 } from 'lucide-react'
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
  factorial,
  permutations,
  combinations,
  numberOfSubsets,
  circularPermutations,
  arrangementsWithIndistinguishable,
  pascalsTriangle,
  type CombinatoricsResult
} from '@/lib/math/combinatorics'

export default function CombinatoriaClient() {
  const [activeTab, setActiveTab] = useState('factorial')
  const [results, setResults] = useState<CombinatoricsResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [factorialValue, setFactorialValue] = useState('')
  const [permutationValues, setPermutationValues] = useState({ n: '', r: '' })
  const [combinationValues, setCombinationValues] = useState({ n: '', r: '' })
  const [subsetValue, setSubsetValue] = useState('')
  const [circularValue, setCircularValue] = useState('')
  const [indistinguishableValues, setIndistinguishableValues] = useState({ n: '', groups: '' })
  const [pascalValue, setPascalValue] = useState('')

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'factorial':
          if (!factorialValue) {
            setError('Por favor, ingresa un número')
            return
          }
          const n = parseInt(factorialValue)
          if (n < 0 || n > 170) {
            setError('El número debe estar entre 0 y 170')
            return
          }
          result = factorial(n)
          break
        case 'permutations':
          if (!permutationValues.n || !permutationValues.r) {
            setError('Por favor, completa ambos campos')
            return
          }
          const nPerm = parseInt(permutationValues.n)
          const rPerm = parseInt(permutationValues.r)
          if (nPerm < 0 || rPerm < 0 || rPerm > nPerm) {
            setError('n ≥ 0, r ≥ 0 y r ≤ n')
            return
          }
          result = permutations(nPerm, rPerm)
          break
        case 'combinations':
          if (!combinationValues.n || !combinationValues.r) {
            setError('Por favor, completa ambos campos')
            return
          }
          const nComb = parseInt(combinationValues.n)
          const rComb = parseInt(combinationValues.r)
          if (nComb < 0 || rComb < 0 || rComb > nComb) {
            setError('n ≥ 0, r ≥ 0 y r ≤ n')
            return
          }
          result = combinations(nComb, rComb)
          break
        case 'subsets':
          if (!subsetValue) {
            setError('Por favor, ingresa un número')
            return
          }
          const nSub = parseInt(subsetValue)
          if (nSub < 0 || nSub > 30) {
            setError('El número debe estar entre 0 y 30')
            return
          }
          result = numberOfSubsets(nSub)
          break
        case 'circular':
          if (!circularValue) {
            setError('Por favor, ingresa un número')
            return
          }
          const nCirc = parseInt(circularValue)
          if (nCirc < 0 || nCirc > 170) {
            setError('El número debe estar entre 0 y 170')
            return
          }
          result = circularPermutations(nCirc)
          break
        case 'indistinguishable':
          if (!indistinguishableValues.n || !indistinguishableValues.groups) {
            setError('Por favor, completa ambos campos')
            return
          }
          const nInd = parseInt(indistinguishableValues.n)
          const groups = indistinguishableValues.groups.split(',').map(g => parseInt(g.trim())).filter(g => !isNaN(g))
          if (nInd < 0 || groups.some(g => g < 0) || groups.reduce((a, b) => a + b, 0) !== nInd) {
            setError('Los números deben ser positivos y la suma de grupos debe igualar n')
            return
          }
          result = arrangementsWithIndistinguishable(nInd, ...groups)
          break
        case 'pascal':
          if (!pascalValue) {
            setError('Por favor, ingresa un número')
            return
          }
          const nPascal = parseInt(pascalValue)
          if (nPascal < 0 || nPascal > 20) {
            setError('El número debe estar entre 0 y 20')
            return
          }
          const triangle = pascalsTriangle(nPascal)
          result = { 
            result: triangle.length, 
            formula: `Triángulo de Pascal con ${nPascal} filas`,
            explanation: `Se generaron ${nPascal} filas del triángulo de Pascal`,
            steps: triangle.map((row, i) => `Fila ${i}: ${row.join(', ')}`) 
          }
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
      case 'factorial':
        setFactorialValue((values.n as number).toString())
        break
      case 'permutations':
        setPermutationValues({ n: (values.n as number).toString(), r: (values.r as number).toString() })
        break
      case 'combinations':
        setCombinationValues({ n: (values.n as number).toString(), r: (values.r as number).toString() })
        break
      case 'subsets':
        setSubsetValue((values.n as number).toString())
        break
      case 'circular':
        setCircularValue((values.n as number).toString())
        break
      case 'indistinguishable':
        setIndistinguishableValues({ n: (values.n as number).toString(), groups: (values.groups as string) })
        break
      case 'pascal':
        setPascalValue((values.n as number).toString())
        break
    }
  }

  const examples = [
    { label: '5!', values: { n: 5 } },
    { label: 'P(10,3)', values: { n: 10, r: 3 } },
    { label: 'C(10,3)', values: { n: 10, r: 3 } },
    { label: 'Subconjuntos de 4 elementos', values: { n: 4 } },
    { label: 'Permutaciones circulares de 5', values: { n: 5 } },
    { label: 'Permutaciones indistinguibles', values: { n: 8, groups: '3,2,2,1' } },
    { label: 'Triángulo de Pascal (5 filas)', values: { n: 5 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es el factorial?",
      answer: "El factorial de un número n (n!) es el producto de todos los números enteros positivos desde 1 hasta n. Por ejemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
      question: "¿Cuál es la diferencia entre permutaciones y combinaciones?",
      answer: "Las permutaciones consideran el orden (P(n,r) = n!/(n-r)!), mientras que las combinaciones no (C(n,r) = n!/(r!(n-r)!))."
    },
    {
      question: "¿Qué son las permutaciones circulares?",
      answer: "Las permutaciones circulares son arreglos de elementos en un círculo donde las rotaciones se consideran equivalentes. La fórmula es (n-1)!."
    },
    {
      question: "¿Qué es el triángulo de Pascal?",
      answer: "El triángulo de Pascal es una representación triangular de los coeficientes binomiales. Cada número es la suma de los dos números directamente arriba de él."
    },
    {
      question: "¿Cuándo usar permutaciones indistinguibles?",
      answer: "Se usan cuando hay elementos repetidos. Por ejemplo, en la palabra 'MISSISSIPPI' hay 4 S, 4 I, 2 P y 1 M."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'combinatoria').map(calc => ({
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
            name: 'Calculadora de Combinatoria',
            description: 'Calcula factorial, permutaciones, combinaciones, subconjuntos y más operaciones combinatorias',
            url: '/matematicas/combinatoria/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/combinatoria/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Combinatoria"
            description="Calcula factorial, permutaciones, combinaciones, subconjuntos y más operaciones combinatorias"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="factorial" className="calculator-tab">Factorial</TabsTrigger>
                <TabsTrigger value="permutations" className="calculator-tab">Permutaciones</TabsTrigger>
                <TabsTrigger value="combinations" className="calculator-tab">Combinaciones</TabsTrigger>
                <TabsTrigger value="subsets" className="calculator-tab">Subconjuntos</TabsTrigger>
                <TabsTrigger value="circular" className="calculator-tab">Circulares</TabsTrigger>
                <TabsTrigger value="indistinguishable" className="calculator-tab">Indistinguibles</TabsTrigger>
                <TabsTrigger value="pascal" className="calculator-tab">Pascal</TabsTrigger>
              </TabsList>

              <TabsContent value="factorial" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="factorial-n" className="calculator-label">
                        Número n
                      </label>
                      <Input
                        id="factorial-n"
                        type="number"
                        min="0"
                        max="170"
                        placeholder="Ej: 5"
                        value={factorialValue}
                        onChange={(e) => setFactorialValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Hash className="h-4 w-4 mr-2" />
                    Calcular Factorial
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="permutations" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="perm-n" className="calculator-label">
                        n (total)
                      </label>
                      <Input
                        id="perm-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 10"
                        value={permutationValues.n}
                        onChange={(e) => setPermutationValues({ ...permutationValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="perm-r" className="calculator-label">
                        r (seleccionar)
                      </label>
                      <Input
                        id="perm-r"
                        type="number"
                        min="0"
                        placeholder="Ej: 3"
                        value={permutationValues.r}
                        onChange={(e) => setPermutationValues({ ...permutationValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Calcular Permutaciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="combinations" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="comb-n" className="calculator-label">
                        n (total)
                      </label>
                      <Input
                        id="comb-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 10"
                        value={combinationValues.n}
                        onChange={(e) => setCombinationValues({ ...combinationValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="comb-r" className="calculator-label">
                        r (seleccionar)
                      </label>
                      <Input
                        id="comb-r"
                        type="number"
                        min="0"
                        placeholder="Ej: 3"
                        value={combinationValues.r}
                        onChange={(e) => setCombinationValues({ ...combinationValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Calcular Combinaciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="subsets" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="subsets-n" className="calculator-label">
                        Número de elementos
                      </label>
                      <Input
                        id="subsets-n"
                        type="number"
                        min="0"
                        max="30"
                        placeholder="Ej: 4"
                        value={subsetValue}
                        onChange={(e) => setSubsetValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Subconjuntos
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="circular" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="circular-n" className="calculator-label">
                        Número de elementos
                      </label>
                      <Input
                        id="circular-n"
                        type="number"
                        min="0"
                        max="170"
                        placeholder="Ej: 5"
                        value={circularValue}
                        onChange={(e) => setCircularValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Permutaciones Circulares
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="indistinguishable" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="indist-n" className="calculator-label">
                        Total de elementos
                      </label>
                      <Input
                        id="indist-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 8"
                        value={indistinguishableValues.n}
                        onChange={(e) => setIndistinguishableValues({ ...indistinguishableValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="indist-groups" className="calculator-label">
                        Grupos (separados por comas)
                      </label>
                      <Input
                        id="indist-groups"
                        type="text"
                        placeholder="Ej: 3,2,2,1"
                        value={indistinguishableValues.groups}
                        onChange={(e) => setIndistinguishableValues({ ...indistinguishableValues, groups: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Permutaciones Indistinguibles
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pascal" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="pascal-n" className="calculator-label">
                        Número de filas
                      </label>
                      <Input
                        id="pascal-n"
                        type="number"
                        min="0"
                        max="20"
                        placeholder="Ej: 5"
                        value={pascalValue}
                        onChange={(e) => setPascalValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Generar Triángulo de Pascal
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
                    {results.result.toLocaleString()}
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
