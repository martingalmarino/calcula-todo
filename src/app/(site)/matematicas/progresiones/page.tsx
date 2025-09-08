import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Progresiones – Aritméticas, geométricas y series infinitas',
  description: 'Calculadora de progresiones online para aritméticas, geométricas, términos n-ésimos, sumas, series infinitas y verificación. Gratis y fácil de usar.',
  canonical: '/matematicas/progresiones/',
})

"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, BarChart3, List } from 'lucide-react'
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
  arithmeticNthTerm,
  arithmeticSum,
  geometricNthTerm,
  geometricSum,
  geometricInfiniteSum,
  generateArithmeticTerms,
  generateGeometricTerms,
  findArithmeticDifference,
  findGeometricRatio,
  isArithmeticProgression,
  isGeometricProgression,
  type ProgressionResult,
  type ProgressionTerms
} from '@/lib/math/progressions'

export default function ProgresionesPage() {
  const [activeTab, setActiveTab] = useState('arithmetic-nth')
  const [results, setResults] = useState<ProgressionResult | ProgressionTerms | { isArithmetic: boolean; difference?: number; steps: string[] } | { isGeometric: boolean; ratio?: number; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [arithmeticValues, setArithmeticValues] = useState({ a1: '', d: '', n: '' })
  const [geometricValues, setGeometricValues] = useState({ a1: '', r: '', n: '' })
  const [infiniteValues, setInfiniteValues] = useState({ a1: '', r: '' })
  const [generateValues, setGenerateValues] = useState({ a1: '', d: '', r: '', n: '' })
  const [findValues, setFindValues] = useState({ a1: '', an: '', n: '' })
  const [verifyValues, setVerifyValues] = useState({ terms: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'arithmetic-nth':
          if (!arithmeticValues.a1 || !arithmeticValues.d || !arithmeticValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = arithmeticNthTerm(Number(arithmeticValues.a1), Number(arithmeticValues.d), Number(arithmeticValues.n))
          break
        case 'arithmetic-sum':
          if (!arithmeticValues.a1 || !arithmeticValues.d || !arithmeticValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = arithmeticSum(Number(arithmeticValues.a1), Number(arithmeticValues.d), Number(arithmeticValues.n))
          break
        case 'geometric-nth':
          if (!geometricValues.a1 || !geometricValues.r || !geometricValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = geometricNthTerm(Number(geometricValues.a1), Number(geometricValues.r), Number(geometricValues.n))
          break
        case 'geometric-sum':
          if (!geometricValues.a1 || !geometricValues.r || !geometricValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = geometricSum(Number(geometricValues.a1), Number(geometricValues.r), Number(geometricValues.n))
          break
        case 'geometric-infinite':
          if (!infiniteValues.a1 || !infiniteValues.r) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = geometricInfiniteSum(Number(infiniteValues.a1), Number(infiniteValues.r))
          break
        case 'generate-arithmetic':
          if (!generateValues.a1 || !generateValues.d || !generateValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = generateArithmeticTerms(Number(generateValues.a1), Number(generateValues.d), Number(generateValues.n))
          break
        case 'generate-geometric':
          if (!generateValues.a1 || !generateValues.r || !generateValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = generateGeometricTerms(Number(generateValues.a1), Number(generateValues.r), Number(generateValues.n))
          break
        case 'find-arithmetic-diff':
          if (!findValues.a1 || !findValues.an || !findValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = findArithmeticDifference(Number(findValues.a1), Number(findValues.an), Number(findValues.n))
          break
        case 'find-geometric-ratio':
          if (!findValues.a1 || !findValues.an || !findValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = findGeometricRatio(Number(findValues.a1), Number(findValues.an), Number(findValues.n))
          break
        case 'verify-arithmetic':
          if (!verifyValues.terms) {
            setError('Por favor, ingresa los términos')
            return
          }
          const terms = verifyValues.terms.split(',').map(t => Number(t.trim()))
          result = isArithmeticProgression(terms)
          break
        case 'verify-geometric':
          if (!verifyValues.terms) {
            setError('Por favor, ingresa los términos')
            return
          }
          const termsGeo = verifyValues.terms.split(',').map(t => Number(t.trim()))
          result = isGeometricProgression(termsGeo)
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
      case 'arithmetic-nth':
      case 'arithmetic-sum':
        setArithmeticValues({ 
          a1: (values.a1 as number).toString(), 
          d: (values.d as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'geometric-nth':
      case 'geometric-sum':
        setGeometricValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'geometric-infinite':
        setInfiniteValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString() 
        })
        break
      case 'generate-arithmetic':
        setGenerateValues({ 
          a1: (values.a1 as number).toString(), 
          d: (values.d as number).toString(), 
          n: (values.n as number).toString(),
          r: ''
        })
        break
      case 'generate-geometric':
        setGenerateValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString(), 
          n: (values.n as number).toString(),
          d: ''
        })
        break
      case 'find-arithmetic-diff':
        setFindValues({ 
          a1: (values.a1 as number).toString(), 
          an: (values.an as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'find-geometric-ratio':
        setFindValues({ 
          a1: (values.a1 as number).toString(), 
          an: (values.an as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'verify-arithmetic':
      case 'verify-geometric':
        setVerifyValues({ terms: (values.terms as string) })
        break
    }
  }

  const examples = [
    { label: 'Aritmética: a₁=2, d=3, n=5', values: { a1: 2, d: 3, n: 5 } },
    { label: 'Geométrica: a₁=2, r=3, n=4', values: { a1: 2, r: 3, n: 4 } },
    { label: 'Suma infinita: a₁=1, r=0.5', values: { a1: 1, r: 0.5 } },
    { label: 'Generar aritmética: a₁=1, d=2, n=5', values: { a1: 1, d: 2, n: 5 } },
    { label: 'Generar geométrica: a₁=1, r=2, n=5', values: { a1: 1, r: 2, n: 5 } },
    { label: 'Encontrar diferencia: a₁=2, aₙ=14, n=5', values: { a1: 2, an: 14, n: 5 } },
    { label: 'Verificar aritmética: 2,5,8,11', values: { terms: '2,5,8,11' } },
    { label: 'Verificar geométrica: 2,6,18,54', values: { terms: '2,6,18,54' } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una progresión aritmética?",
      answer: "Una progresión aritmética es una secuencia de números donde cada término se obtiene sumando una constante (diferencia común) al término anterior. La fórmula del n-ésimo término es aₙ = a₁ + (n-1)d."
    },
    {
      question: "¿Qué es una progresión geométrica?",
      answer: "Una progresión geométrica es una secuencia de números donde cada término se obtiene multiplicando el término anterior por una constante (razón común). La fórmula del n-ésimo término es aₙ = a₁ × r^(n-1)."
    },
    {
      question: "¿Cómo se calcula la suma de una progresión aritmética?",
      answer: "La suma de los primeros n términos de una progresión aritmética se calcula con la fórmula Sₙ = (n/2)(a₁ + aₙ), donde aₙ es el n-ésimo término."
    },
    {
      question: "¿Cómo se calcula la suma de una progresión geométrica?",
      answer: "La suma de los primeros n términos de una progresión geométrica se calcula con Sₙ = a₁(r^n - 1)/(r - 1) cuando r ≠ 1, y Sₙ = a₁ × n cuando r = 1."
    },
    {
      question: "¿Cuándo converge la suma infinita de una progresión geométrica?",
      answer: "La suma infinita de una progresión geométrica converge cuando |r| &lt; 1, y su valor es S∞ = a₁/(1 - r). Si |r| ≥ 1, la serie diverge."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'progresiones').map(calc => ({
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
            name: 'Calculadora de Progresiones',
            description: 'Calcula términos, sumas y más de progresiones aritméticas y geométricas',
            url: '/matematicas/progresiones/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/progresiones/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Progresiones"
            description="Calcula términos, sumas y más de progresiones aritméticas y geométricas"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="arithmetic-nth" className="calculator-tab">Arit. Término</TabsTrigger>
                <TabsTrigger value="arithmetic-sum" className="calculator-tab">Arit. Suma</TabsTrigger>
                <TabsTrigger value="geometric-nth" className="calculator-tab">Geom. Término</TabsTrigger>
                <TabsTrigger value="geometric-sum" className="calculator-tab">Geom. Suma</TabsTrigger>
                <TabsTrigger value="geometric-infinite" className="calculator-tab">Suma Infinita</TabsTrigger>
                <TabsTrigger value="generate-arithmetic" className="calculator-tab">Gen. Arit.</TabsTrigger>
                <TabsTrigger value="generate-geometric" className="calculator-tab">Gen. Geom.</TabsTrigger>
                <TabsTrigger value="find-arithmetic-diff" className="calculator-tab">Encontrar d</TabsTrigger>
                <TabsTrigger value="find-geometric-ratio" className="calculator-tab">Encontrar r</TabsTrigger>
                <TabsTrigger value="verify-arithmetic" className="calculator-tab">Verif. Arit.</TabsTrigger>
                <TabsTrigger value="verify-geometric" className="calculator-tab">Verif. Geom.</TabsTrigger>
              </TabsList>

              <TabsContent value="arithmetic-nth" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="arith-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="arith-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={arithmeticValues.a1}
                        onChange={(e) => setArithmeticValues({ ...arithmeticValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-d" className="calculator-label">
                        Diferencia común (d)
                      </label>
                      <Input
                        id="arith-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={arithmeticValues.d}
                        onChange={(e) => setArithmeticValues({ ...arithmeticValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-n" className="calculator-label">
                        Posición (n)
                      </label>
                      <Input
                        id="arith-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 5"
                        value={arithmeticValues.n}
                        onChange={(e) => setArithmeticValues({ ...arithmeticValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Calcular Término n-ésimo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="arithmetic-sum" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="arith-sum-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="arith-sum-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={arithmeticValues.a1}
                        onChange={(e) => setArithmeticValues({ ...arithmeticValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-sum-d" className="calculator-label">
                        Diferencia común (d)
                      </label>
                      <Input
                        id="arith-sum-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={arithmeticValues.d}
                        onChange={(e) => setArithmeticValues({ ...arithmeticValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-sum-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="arith-sum-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 5"
                        value={arithmeticValues.n}
                        onChange={(e) => setArithmeticValues({ ...arithmeticValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Calcular Suma
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="geometric-nth" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="geom-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="geom-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={geometricValues.a1}
                        onChange={(e) => setGeometricValues({ ...geometricValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geom-r" className="calculator-label">
                        Razón común (r)
                      </label>
                      <Input
                        id="geom-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={geometricValues.r}
                        onChange={(e) => setGeometricValues({ ...geometricValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geom-n" className="calculator-label">
                        Posición (n)
                      </label>
                      <Input
                        id="geom-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 4"
                        value={geometricValues.n}
                        onChange={(e) => setGeometricValues({ ...geometricValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Calcular Término n-ésimo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="geometric-sum" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="geom-sum-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="geom-sum-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={geometricValues.a1}
                        onChange={(e) => setGeometricValues({ ...geometricValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geom-sum-r" className="calculator-label">
                        Razón común (r)
                      </label>
                      <Input
                        id="geom-sum-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={geometricValues.r}
                        onChange={(e) => setGeometricValues({ ...geometricValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geom-sum-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="geom-sum-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 4"
                        value={geometricValues.n}
                        onChange={(e) => setGeometricValues({ ...geometricValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Calcular Suma
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="geometric-infinite" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="inf-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="inf-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={infiniteValues.a1}
                        onChange={(e) => setInfiniteValues({ ...infiniteValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="inf-r" className="calculator-label">
                        Razón común (r, |r| &lt; 1)
                      </label>
                      <Input
                        id="inf-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 0.5"
                        value={infiniteValues.r}
                        onChange={(e) => setInfiniteValues({ ...infiniteValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Suma Infinita
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="generate-arithmetic" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="gen-arith-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="gen-arith-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={generateValues.a1}
                        onChange={(e) => setGenerateValues({ ...generateValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-arith-d" className="calculator-label">
                        Diferencia común (d)
                      </label>
                      <Input
                        id="gen-arith-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={generateValues.d}
                        onChange={(e) => setGenerateValues({ ...generateValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-arith-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="gen-arith-n"
                        type="number"
                        min="1"
                        max="20"
                        placeholder="Ej: 5"
                        value={generateValues.n}
                        onChange={(e) => setGenerateValues({ ...generateValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <List className="h-4 w-4 mr-2" />
                    Generar Términos
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="generate-geometric" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="gen-geom-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="gen-geom-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={generateValues.a1}
                        onChange={(e) => setGenerateValues({ ...generateValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-geom-r" className="calculator-label">
                        Razón común (r)
                      </label>
                      <Input
                        id="gen-geom-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={generateValues.r}
                        onChange={(e) => setGenerateValues({ ...generateValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-geom-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="gen-geom-n"
                        type="number"
                        min="1"
                        max="20"
                        placeholder="Ej: 5"
                        value={generateValues.n}
                        onChange={(e) => setGenerateValues({ ...generateValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <List className="h-4 w-4 mr-2" />
                    Generar Términos
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="find-arithmetic-diff" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="find-arith-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="find-arith-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={findValues.a1}
                        onChange={(e) => setFindValues({ ...findValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="find-arith-an" className="calculator-label">
                        n-ésimo término (aₙ)
                      </label>
                      <Input
                        id="find-arith-an"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 14"
                        value={findValues.an}
                        onChange={(e) => setFindValues({ ...findValues, an: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="find-arith-n" className="calculator-label">
                        Posición (n)
                      </label>
                      <Input
                        id="find-arith-n"
                        type="number"
                        min="2"
                        placeholder="Ej: 5"
                        value={findValues.n}
                        onChange={(e) => setFindValues({ ...findValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Encontrar Diferencia
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="find-geometric-ratio" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="find-geom-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="find-geom-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={findValues.a1}
                        onChange={(e) => setFindValues({ ...findValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="find-geom-an" className="calculator-label">
                        n-ésimo término (aₙ)
                      </label>
                      <Input
                        id="find-geom-an"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 54"
                        value={findValues.an}
                        onChange={(e) => setFindValues({ ...findValues, an: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="find-geom-n" className="calculator-label">
                        Posición (n)
                      </label>
                      <Input
                        id="find-geom-n"
                        type="number"
                        min="2"
                        placeholder="Ej: 4"
                        value={findValues.n}
                        onChange={(e) => setFindValues({ ...findValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Encontrar Razón
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="verify-arithmetic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="verify-arith-terms" className="calculator-label">
                      Términos (separados por comas)
                    </label>
                    <Input
                      id="verify-arith-terms"
                      type="text"
                      placeholder="Ej: 2,5,8,11"
                      value={verifyValues.terms}
                      onChange={(e) => setVerifyValues({ ...verifyValues, terms: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Verificar Progresión Aritmética
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="verify-geometric" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="verify-geom-terms" className="calculator-label">
                      Términos (separados por comas)
                    </label>
                    <Input
                      id="verify-geom-terms"
                      type="text"
                      placeholder="Ej: 2,6,18,54"
                      value={verifyValues.terms}
                      onChange={(e) => setVerifyValues({ ...verifyValues, terms: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Verificar Progresión Geométrica
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
                  {(activeTab.includes('generate') || activeTab.includes('verify')) ? (
                    <div className="space-y-2">
                      {activeTab.includes('generate') && (
                        <div className="text-lg font-semibold">
                          Términos generados:
                        </div>
                      )}
                      {activeTab.includes('verify') && (
                        <div className="text-lg font-semibold">
                          {(results as { isArithmetic: boolean; difference?: number; steps: string[] }).isArithmetic !== undefined 
                            ? ((results as { isArithmetic: boolean; difference?: number; steps: string[] }).isArithmetic ? '✓ Es una progresión aritmética' : '✗ No es una progresión aritmética')
                            : ((results as { isGeometric: boolean; ratio?: number; steps: string[] }).isGeometric ? '✓ Es una progresión geométrica' : '✗ No es una progresión geométrica')
                          }
                        </div>
                      )}
                      {(results as ProgressionTerms).terms && (
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                          [{(results as ProgressionTerms).terms.join(', ')}]
                        </div>
                      )}
                      {(results as { isArithmetic: boolean; difference?: number; steps: string[] }).difference !== undefined && (
                        <div className="text-lg font-semibold">
                          Diferencia común: {(results as { isArithmetic: boolean; difference?: number; steps: string[] }).difference}
                        </div>
                      )}
                      {(results as { isGeometric: boolean; ratio?: number; steps: string[] }).ratio !== undefined && (
                        <div className="text-lg font-semibold">
                          Razón común: {(results as { isGeometric: boolean; ratio?: number; steps: string[] }).ratio}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-primary">
                      {(results as ProgressionResult).result.toFixed(6)}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Explicación:</h4>
                    <p className="text-sm text-muted-foreground">{(results as ProgressionResult).explanation}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {(results as ProgressionResult).steps.map((step: string, index: number) => (
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
