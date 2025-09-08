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
  permutationsWithRepetition,
  combinationsWithRepetition,
  numberOfSubsets,
  circularPermutations,
  arrangementsWithIndistinguishable,
  binomialCoefficient,
  pascalsTriangle
} from '@/lib/math/combinatorics'

export default function CombinatoriaPage() {
  const [activeTab, setActiveTab] = useState('factorial')
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [factorialValues, setFactorialValues] = useState({ n: '' })
  const [permutationValues, setPermutationValues] = useState({ n: '', r: '' })
  const [combinationValues, setCombinationValues] = useState({ n: '', r: '' })
  const [permutationRepValues, setPermutationRepValues] = useState({ n: '', r: '' })
  const [combinationRepValues, setCombinationRepValues] = useState({ n: '', r: '' })
  const [subsetsValues, setSubsetsValues] = useState({ n: '' })
  const [circularValues, setCircularValues] = useState({ n: '' })
  const [indistinguishableValues, setIndistinguishableValues] = useState({ n: '', groups: '' })
  const [pascalValues, setPascalValues] = useState({ n: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'factorial':
          if (!factorialValues.n) {
            setError('Por favor, ingresa un número')
            return
          }
          result = factorial(Number(factorialValues.n))
          break
        case 'permutations':
          if (!permutationValues.n || !permutationValues.r) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = permutations(Number(permutationValues.n), Number(permutationValues.r))
          break
        case 'combinations':
          if (!combinationValues.n || !combinationValues.r) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = combinations(Number(combinationValues.n), Number(combinationValues.r))
          break
        case 'permutations-rep':
          if (!permutationRepValues.n || !permutationRepValues.r) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = permutationsWithRepetition(Number(permutationRepValues.n), Number(permutationRepValues.r))
          break
        case 'combinations-rep':
          if (!combinationRepValues.n || !combinationRepValues.r) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = combinationsWithRepetition(Number(combinationRepValues.n), Number(combinationRepValues.r))
          break
        case 'subsets':
          if (!subsetsValues.n) {
            setError('Por favor, ingresa un número')
            return
          }
          result = numberOfSubsets(Number(subsetsValues.n))
          break
        case 'circular':
          if (!circularValues.n) {
            setError('Por favor, ingresa un número')
            return
          }
          result = circularPermutations(Number(circularValues.n))
          break
        case 'indistinguishable':
          if (!indistinguishableValues.n || !indistinguishableValues.groups) {
            setError('Por favor, completa todos los campos')
            return
          }
          const n = Number(indistinguishableValues.n)
          const groups = indistinguishableValues.groups.split(',').map(g => Number(g.trim()))
          result = arrangementsWithIndistinguishable(n, ...groups)
          break
        case 'pascal':
          if (!pascalValues.n) {
            setError('Por favor, ingresa un número')
            return
          }
          const triangle = pascalsTriangle(Number(pascalValues.n))
          result = {
            result: triangle,
            formula: `Triángulo de Pascal hasta la fila ${pascalValues.n}`,
            steps: triangle.map((row, index) => `Fila ${index}: [${row.join(', ')}]`),
            explanation: `El triángulo de Pascal hasta la fila ${pascalValues.n}`
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
        setFactorialValues({ n: (values.n as number).toString() })
        break
      case 'permutations':
        setPermutationValues({ n: (values.n as number).toString(), r: (values.r as number).toString() })
        break
      case 'combinations':
        setCombinationValues({ n: (values.n as number).toString(), r: (values.r as number).toString() })
        break
      case 'permutations-rep':
        setPermutationRepValues({ n: (values.n as number).toString(), r: (values.r as number).toString() })
        break
      case 'combinations-rep':
        setCombinationRepValues({ n: (values.n as number).toString(), r: (values.r as number).toString() })
        break
      case 'subsets':
        setSubsetsValues({ n: (values.n as number).toString() })
        break
      case 'circular':
        setCircularValues({ n: (values.n as number).toString() })
        break
      case 'indistinguishable':
        setIndistinguishableValues({ n: (values.n as number).toString(), groups: (values.groups as string) })
        break
      case 'pascal':
        setPascalValues({ n: (values.n as number).toString() })
        break
    }
  }

  const examples = [
    { label: '5!', values: { n: 5 } },
    { label: 'P(5,3)', values: { n: 5, r: 3 } },
    { label: 'C(5,3)', values: { n: 5, r: 3 } },
    { label: 'P^r(3,2)', values: { n: 3, r: 2 } },
    { label: 'C^r(3,2)', values: { n: 3, r: 2 } },
    { label: '2^4 subconjuntos', values: { n: 4 } },
    { label: 'Permutaciones circulares de 4', values: { n: 4 } },
    { label: 'Arreglos indistinguibles', values: { n: 5, groups: '2,2,1' } },
    { label: 'Triángulo de Pascal 5', values: { n: 5 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es el factorial?",
      answer: "El factorial de un número n (n!) es el producto de todos los números enteros positivos desde 1 hasta n. Por ejemplo, 5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
      question: "¿Cuál es la diferencia entre permutaciones y combinaciones?",
      answer: "Las permutaciones consideran el orden de los elementos (importa el orden), mientras que las combinaciones no consideran el orden (no importa el orden)."
    },
    {
      question: "¿Qué son las permutaciones con repetición?",
      answer: "Las permutaciones con repetición permiten que los elementos se repitan. Se calculan como n^r, donde n es el número de elementos disponibles y r es el número de posiciones."
    },
    {
      question: "¿Qué son las combinaciones con repetición?",
      answer: "Las combinaciones con repetición permiten seleccionar elementos con repetición, pero sin considerar el orden. Se calculan como C(n+r-1, r)."
    },
    {
      question: "¿Qué es el triángulo de Pascal?",
      answer: "El triángulo de Pascal es una disposición triangular de números donde cada número es la suma de los dos números directamente encima de él. Los números en la fila n representan los coeficientes binomiales C(n,k)."
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
            description: 'Calcula factoriales, permutaciones, combinaciones y más problemas de combinatoria',
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
            description="Calcula factoriales, permutaciones, combinaciones y más problemas de combinatoria"
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
                <TabsTrigger value="permutations-rep" className="calculator-tab">P. con Rep.</TabsTrigger>
                <TabsTrigger value="combinations-rep" className="calculator-tab">C. con Rep.</TabsTrigger>
                <TabsTrigger value="subsets" className="calculator-tab">Subconjuntos</TabsTrigger>
                <TabsTrigger value="circular" className="calculator-tab">Circulares</TabsTrigger>
                <TabsTrigger value="indistinguishable" className="calculator-tab">Indistinguibles</TabsTrigger>
                <TabsTrigger value="pascal" className="calculator-tab">Pascal</TabsTrigger>
              </TabsList>

              <TabsContent value="factorial" className="space-y-4">
                <div className="space-y-4">
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
                      value={factorialValues.n}
                      onChange={(e) => setFactorialValues({ ...factorialValues, n: e.target.value })}
                      className="calculator-input"
                    />
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
                        n (total elementos)
                      </label>
                      <Input
                        id="perm-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 5"
                        value={permutationValues.n}
                        onChange={(e) => setPermutationValues({ ...permutationValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="perm-r" className="calculator-label">
                        r (elementos a ordenar)
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
                        n (total elementos)
                      </label>
                      <Input
                        id="comb-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 5"
                        value={combinationValues.n}
                        onChange={(e) => setCombinationValues({ ...combinationValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="comb-r" className="calculator-label">
                        r (elementos a seleccionar)
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

              <TabsContent value="permutations-rep" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="perm-rep-n" className="calculator-label">
                        n (elementos disponibles)
                      </label>
                      <Input
                        id="perm-rep-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 3"
                        value={permutationRepValues.n}
                        onChange={(e) => setPermutationRepValues({ ...permutationRepValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="perm-rep-r" className="calculator-label">
                        r (posiciones)
                      </label>
                      <Input
                        id="perm-rep-r"
                        type="number"
                        min="0"
                        placeholder="Ej: 2"
                        value={permutationRepValues.r}
                        onChange={(e) => setPermutationRepValues({ ...permutationRepValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Calcular Permutaciones con Repetición
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="combinations-rep" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="comb-rep-n" className="calculator-label">
                        n (elementos disponibles)
                      </label>
                      <Input
                        id="comb-rep-n"
                        type="number"
                        min="0"
                        placeholder="Ej: 3"
                        value={combinationRepValues.n}
                        onChange={(e) => setCombinationRepValues({ ...combinationRepValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="comb-rep-r" className="calculator-label">
                        r (elementos a seleccionar)
                      </label>
                      <Input
                        id="comb-rep-r"
                        type="number"
                        min="0"
                        placeholder="Ej: 2"
                        value={combinationRepValues.r}
                        onChange={(e) => setCombinationRepValues({ ...combinationRepValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Calcular Combinaciones con Repetición
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="subsets" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subsets-n" className="calculator-label">
                      n (elementos del conjunto)
                    </label>
                    <Input
                      id="subsets-n"
                      type="number"
                      min="0"
                      placeholder="Ej: 4"
                      value={subsetsValues.n}
                      onChange={(e) => setSubsetsValues({ ...subsetsValues, n: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Número de Subconjuntos
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="circular" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="circular-n" className="calculator-label">
                      n (elementos)
                    </label>
                    <Input
                      id="circular-n"
                      type="number"
                      min="0"
                      placeholder="Ej: 4"
                      value={circularValues.n}
                      onChange={(e) => setCircularValues({ ...circularValues, n: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Permutaciones Circulares
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="indistinguishable" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="indist-n" className="calculator-label">
                      n (total de elementos)
                    </label>
                    <Input
                      id="indist-n"
                      type="number"
                      min="0"
                      placeholder="Ej: 5"
                      value={indistinguishableValues.n}
                      onChange={(e) => setIndistinguishableValues({ ...indistinguishableValues, n: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="indist-groups" className="calculator-label">
                      Tamaños de grupos (separados por comas)
                    </label>
                    <Input
                      id="indist-groups"
                      type="text"
                      placeholder="Ej: 2,2,1"
                      value={indistinguishableValues.groups}
                      onChange={(e) => setIndistinguishableValues({ ...indistinguishableValues, groups: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Arreglos Indistinguibles
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pascal" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="pascal-n" className="calculator-label">
                      n (número de filas)
                    </label>
                    <Input
                      id="pascal-n"
                      type="number"
                      min="0"
                      max="20"
                      placeholder="Ej: 5"
                      value={pascalValues.n}
                      onChange={(e) => setPascalValues({ ...pascalValues, n: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
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
                    {results.formula} = {results.result.toLocaleString()}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Explicación:</h4>
                    <p className="text-sm text-muted-foreground">{results.explanation}</p>
                  </div>
                  
                  {activeTab === 'pascal' && Array.isArray(results.result) && (
                    <div>
                      <h4 className="font-medium mb-2">Triángulo de Pascal:</h4>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        {results.result.map((row, index) => (
                          <div key={index} className="text-center">
                            {row.join(' ')}
                          </div>
                        ))}
                      </div>
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
